const button = document.querySelector("button");

button.addEventListener("click", () => {
  Notification.requestPermission().then((perm) => {
    if (perm === "granted") {
      const notification = new Notification("An Example notification", {
        body: "This is more text",
        // custom data
        data: { hello: "world" },
        // tag: "Welcome Message"
      });

      notification.addEventListener("close", (e) => {
        console.log(e);
      });
    }
  });
});

let notification;
let interval;
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    const leaveDate = new Date();
    interval = setInterval(() => {
      notification = new Notification("Come back please", {
        body: `You have been gone for ${Math.round(
          (new Date() - leaveDate) / 1000
        )} seconds`,
        tag: "Come Back",
      });
    }, 100);
  } else {
    if (interval) clearInterval(interval);
    if (notification) notification.close();
  }
});

// const button = document.querySelector("button");
//     const reminders = [];

//     // Function to create reminder notification
//     function createReminderNotification(reminder) {
//       const { time, message } = reminder;
//       const notification = new Notification("Reminder", {
//         body: message,
//         // custom data
//         data: { reminder: reminder },
//         // set the reminder time as the notification timestamp
//         timestamp: new Date(time),
//       });

//       // Add event listener for the "close" event on the notification
//       notification.addEventListener("close", (e) => {
//         console.log(e);
//       });
//     }

//     // Event listener for "Add Reminder" button click
//     button.addEventListener("click", () => {
//       // Get input values from the form
//       const timeInput = document.getElementById("timeInput");
//       const messageInput = document.getElementById("messageInput");
//       const time = timeInput.value;
//       const message = messageInput.value;

//       // Create a reminder object
//       const reminder = { time, message };

//       // Request notification permission
//       Notification.requestPermission().then((perm) => {
//         if (perm === "granted") {
//           // Create notification with reminder message and custom data
//           createReminderNotification(reminder);
//           // Add reminder to reminders array
//           reminders.push(reminder);
//         }
//       });
//     });

//     // Function to start checking for reminders
//     function startCheckingReminders() {
//       setInterval(() => {
//         const currentTime = new Date();

//         // Loop through reminders array
//         for (const reminder of reminders) {
//           // Convert reminder time to Date object
//           const reminderTime = new Date(reminder.time);

//           // Check if reminder time has passed
//           if (currentTime >= reminderTime) {
//             // Trigger notification for passed reminder
//             createReminderNotification(reminder);
//           }
//         }
//       }, 1000); // Check every 1 second
//     }

//     // Start checking for reminders
//     startCheckingReminders();
