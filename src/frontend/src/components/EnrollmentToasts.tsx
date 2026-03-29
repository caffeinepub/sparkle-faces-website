import { useEffect, useRef } from "react";
import { toast } from "sonner";

const NOTIFICATIONS = [
  "Priya from Mumbai just enrolled her daughter ✨",
  "Aryan's parents from Delhi confirmed their slot 🌟",
  "Meera from Pune enrolled her son just now",
  "Rahul's family from Hyderabad just signed up!",
  "Sneha from Ahmedabad secured her child's spot ⭐",
  "Ananya from Kolkata enrolled 2 hours ago",
  "Diya's parents from Bangalore just joined",
  "Rohan from Chennai enrolled moments ago 🎬",
  "Kavya from Delhi enrolled her daughter 🌟",
];

export function EnrollmentToasts() {
  const indexRef = useRef(Math.floor(Math.random() * NOTIFICATIONS.length));

  useEffect(() => {
    const timerRef: { current: ReturnType<typeof setTimeout> | null } = {
      current: null,
    };

    const schedule = () => {
      const delay = 8000 + Math.random() * 4000;
      timerRef.current = setTimeout(() => {
        const msg = NOTIFICATIONS[indexRef.current % NOTIFICATIONS.length];
        indexRef.current++;
        toast(msg, {
          description: "Sparkle Faces · Just now",
          duration: 4000,
          style: {
            background: "rgba(14,16,21,0.95)",
            border: "1px solid rgba(200,162,90,0.35)",
            color: "#f0ece3",
          },
        });
        schedule();
      }, delay);
    };

    schedule();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return null;
}
