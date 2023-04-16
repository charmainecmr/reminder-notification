const reminders = []; // Array to store reminders

      const addReminderForm = document.getElementById("addReminderForm");
      const reminderInput = document.getElementById("reminderInput");
      const timeInput = document.getElementById("timeInput");
      
    //  test notification
    //   const button = document.querySelector("button");
    //   button.addEventListener("click", () => {
    //     Notification.requestPermission().then((perm) => {
    //       if (perm === "granted") {
    //         const notification = new Notification("An Example notification", {
    //           body: "This is more text",
    //           // custom data
    //           data: { hello: "world" },
    //           // tag: "Welcome Message"
    //         });

    //         notification.addEventListener("close", (e) => {
    //           console.log(e);
    //         });
    //       }
    //     });
    //   });

      // Add event listener to the form to handle reminder submission
      addReminderForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const reminderText = reminderInput.value.trim();
        const reminderTime = timeInput.value;

        if (reminderText !== "" && reminderTime !== "") {
          const reminder = { text: reminderText, time: reminderTime }; // Store time as string in reminder object
          reminders.push(reminder);
          displayReminders();
          reminderInput.value = "";
          timeInput.value = "";
          setReminderNotification(reminderText, reminderTime); // Call function to set notification for the reminder
        }
      });

      // Function to display reminders in the HTML
      function displayReminders() {
        const remindersList = document.getElementById("remindersList");
        let remindersListHTML = "";

        reminders.forEach((reminder, index) => {
          remindersListHTML += `<li>${reminder.text} (Time: ${reminder.time})</li>`; // Include time in the list item
        });

        remindersList.innerHTML = remindersListHTML;
      }

      // Function to set notification for a specific reminder time
      function setReminderNotification(reminderText, reminderTime) {
        const [hour, minute] = reminderTime.split(":"); // Split time string into hour and minute parts
        const now = new Date(); // Current date and time
        const reminderDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hour,
          minute
        ); // Create date object with reminder time

        // Check if reminder time is in the past, if so, set it for the next day
        if (reminderDate < now) {
          reminderDate.setDate(now.getDate() + 1);
        }

        // Calculate time difference in milliseconds from current time to reminder time
        const timeDifference = reminderDate.getTime() - now.getTime();

        // Set notification with the reminder text
        setTimeout(() => {
          if (Notification.permission === "granted") {
            const notification = new Notification(reminderText, {
              body: `It's time for your reminder!`,
            });
          }
        }, timeDifference);
      }
