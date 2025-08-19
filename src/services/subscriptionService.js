// src/services/subscriptionService.js
import { collection, addDoc, updateDoc, doc, query, where, getDocs, limit, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export class SubscriptionService {

  static async simulatePayment(paymentData) {
    try {
      const cloudFunctionUrl = 'https://us-central1-diabeaters-4cf9e.cloudfunctions.net/simulatePayment';

      const response = await fetch(cloudFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: paymentData.userId,
          plan: paymentData.plan,
          simulateFail: paymentData.simulateFail || false,
          cardNumber: paymentData.cardNumber,
          expiry: paymentData.expiry,
          cvv: paymentData.cvv,
          nameOnCard: paymentData.nameOnCard,
        })
      });

      // Check content type
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error(
          `Unexpected server response (${response.status}). ` +
          'Check function URL/region and that the function returned JSON.'
        );
      }

      const data = await response.json();

      if (response.status === 200 && data.success === true) {
        return {
          success: true,
          transactionId: data.transactionId,
          paidAt: data.paidAt,
          paymentMethod: data.paymentMethod
        };
      }

      throw new Error(data.message || 'Payment failed');

    } catch (error) {
      console.error('Payment simulation error:', error.message);
      throw new Error(`Network error: ${error.message}`);
    }
  }

  static async generateUniquePartnerCode() {
    while (true) {
      const code = Math.floor(Math.random() * 9000) + 1000; // Generates 4-digit number
      const codeStr = code.toString();

      const q = query(
        collection(db, 'partner_codes'),
        where('code', '==', codeStr)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return codeStr;
      }
    }
  }

  static async createSubscription(userId) {
    const plansQuery = query(
      collection(db, 'plans'),
      where('tier', '==', 'premium'),
      limit(1)
    );
    const planSnapshot = await getDocs(plansQuery);

    if (planSnapshot.empty) {
      throw new Error('Premium plan not found in database');
    }

    const planDoc = planSnapshot.docs[0];
    const plan = { id: planDoc.id, ...planDoc.data() };

    const now = new Date();
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

    const subscriptionData = {
      subscriptionId: doc(collection(db, 'subscriptions')).id,
      userId: userId,
      type: plan.type,
      price: plan.price,
      startDate: now,
      endDate: endDate,
      status: 'active',
      paymentMethod: 'simulated',
      plan: plan.name,
      createdAt: now
    };

    await addDoc(collection(db, 'subscriptions'), subscriptionData);
    return subscriptionData;
  }

  static async createPartnerCode(userId) {
    const partnerCode = await this.generateUniquePartnerCode();
    const now = new Date();

    const codeData = {
      code: partnerCode,
      ownerUserId: userId,
      status: 'active',
      createdAt: now
    };

    await setDoc(doc(db, 'partner_codes', partnerCode), codeData);
    return partnerCode;
  }

  static async updateUserToPremium(userId) {
    const userDocRef = doc(db, 'user_accounts', userId);
    await updateDoc(userDocRef, {
      isPremium: true,
      role: 'premium'
    });
  }

  static async checkUserPremiumStatus(userId) {
    try {
      // Check user account for isPremium flag
      const userDocRef = doc(db, 'user_accounts', userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        return {
          hasPremium: false,
          reason: 'User account not found - treating as new user'
        };
      }

      const userData = userDoc.data();

      // Check if user already has premium status
      if (userData.isPremium === true) {
        return {
          hasPremium: true,
          reason: 'User already has premium status'
        };
      }

      // Check for active subscriptions
      const subscriptionsQuery = query(
        collection(db, 'subscriptions'),
        where('userId', '==', userId),
        where('status', '==', 'active')
      );
      const subscriptionsSnapshot = await getDocs(subscriptionsQuery);

      if (!subscriptionsSnapshot.empty) {
        // Check if any subscription is still valid (not expired)
        const now = new Date();
        const activeSubscriptions = subscriptionsSnapshot.docs.filter(doc => {
          const subscription = doc.data();
          const endDate = subscription.endDate.toDate ? subscription.endDate.toDate() : new Date(subscription.endDate);
          return endDate > now;
        });

        if (activeSubscriptions.length > 0) {
          return {
            hasPremium: true,
            reason: 'User has an active subscription'
          };
        }
      }

      return {
        hasPremium: false,
        reason: 'User does not have premium'
      };

    } catch (error) {
      console.error('Error checking premium status:', error);
      return {
        hasPremium: false,
        reason: 'Error occurred but treating as non-premium user'
      };
    }
  }

  static async processPremiumUpgrade(userId, paymentData) {
    try {
      const premiumStatus = await this.checkUserPremiumStatus(userId);
      if (premiumStatus.hasPremium) {
        throw new Error('You have an existing plan already');
      }

      const paymentPayload = {
        userId: userId,
        plan: 'premium',
        simulateFail: false,
        cardNumber: paymentData.cardNumber,
        expiry: paymentData.expiry,
        cvv: paymentData.cvv,
        nameOnCard: paymentData.nameOnCard,
      };

      const paymentResult = await this.simulatePayment(paymentPayload);

      if (!paymentResult.success) {
        throw new Error('Payment failed');
      }

      await this.createSubscription(userId);

      const partnerCode = await this.createPartnerCode(userId);

      await this.updateUserToPremium(userId);

      return {
        success: true,
        partnerCode,
        transactionId: paymentResult.transactionId,
        paidAt: paymentResult.paidAt,
        paymentMethod: paymentResult.paymentMethod
      };
    } catch (error) {
      console.error('Premium upgrade error:', error);
      throw error;
    }
  }
}
