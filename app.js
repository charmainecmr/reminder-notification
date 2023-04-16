// Array to store reminders
const reminders = [];

// Function to add a reminder
function addReminder(time, message) {
    const reminder = {
        time: time,
        message: message
    };
    reminders.push(reminder);
}

// Function to start checking reminders
function startCheckingReminders() {
    setInterval(function() {
        const now = new Date().getTime();
        reminders.forEach(function(reminder, index) {
            if (now >= reminder.time) {
                // Time has passed, notify the user
                console.log(`Reminder: ${reminder.message}`);
                // Remove the reminder from the array
                reminders.splice(index, 1);
            }
        });
    }, 1000); // Check every second
}

// Add event listener to the form submit
document.getElementById('reminderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const timeInput = document.getElementById('timeInput');
    const messageInput = document.getElementById('messageInput');
    const time = new Date(timeInput.value).getTime();
    const message = messageInput.value;
    addReminder(time, message);
    timeInput.value = '';
    messageInput.value = '';
});

// Start checking reminders
startCheckingReminders();
