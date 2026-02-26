import { useEffect } from 'react';
import useAppStore from '../store/useAppStore';
import { generateRandomAlert } from '../data/mockData';

export const useWebsocketSimulator = () => {
  const { setWebsocketConnected, addAlert, websocketConnected, updateSystemMetrics, threatScore, apiRequestRate, cacheHitRatio } = useAppStore();

  useEffect(() => {
    // Simulate connection delay
    const timer = setTimeout(() => {
      setWebsocketConnected(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [setWebsocketConnected]);

  useEffect(() => {
    if (!websocketConnected) return;

    // Simulate incoming alerts
    const alertInterval = setInterval(() => {
      // Only 30% chance to actually trigger an alert on tick to make it feel random
      if (Math.random() > 0.7) {
        addAlert(generateRandomAlert());
      }
    }, 4000);

    // Simulate metric fluctuations
    const metricsInterval = setInterval(() => {
        // Safe access (in case state is slightly behind in this closure)
        const currentRate = useAppStore.getState().apiRequestRate;
        const currentScore = useAppStore.getState().threatScore;
        const currentHit = useAppStore.getState().cacheHitRatio;

        const scoreChange = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const rateChange = Math.floor(Math.random() * 100) - 50; // -50 to +50
        const hitChange = (Math.random() * 2 - 1).toFixed(1); // -1.0 to +1.0
        
        let newScore = Math.min(100, Math.max(0, currentScore + scoreChange));
        
        // Spike threat score occasionally
        if(Math.random() > 0.95) newScore += 15;

        updateSystemMetrics({
            threatScore: Math.min(100, newScore),
            apiRequestRate: Math.max(0, currentRate + rateChange),
            cacheHitRatio: Math.min(100, Math.max(0, parseFloat(currentHit) + parseFloat(hitChange)))
        });
    }, 3000);

    return () => {
        clearInterval(alertInterval);
        clearInterval(metricsInterval);
    }
  }, [websocketConnected, addAlert, updateSystemMetrics]);

};
