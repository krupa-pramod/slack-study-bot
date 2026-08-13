require("dotenv").config();
const axios = require("axios")
const { App } = require("@slack/bolt");
const homework = [];

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/studdybuddy-study", async ({ command, ack, respond }) => {
  const start = Date.now();

  await ack();

  const latency = Date.now() - start;

  await respond({
    text: `Pong! Latency is ${latency}ms`
  });
});

app.command("/studdybuddy-help", async({ack, respond}) => {
    await ack();
    await respond({
        text: `
        Available Commands:
        /studdybuddy-add-homework: add a homework assignment to the assignments list
        /studdybuddy-view-homework: view the list of homework assignments saved
        /studdybuddy-remind: set a timed reminder to do your assignment
        /studdybuddy-study: start a timed study session for a specific subject
        /studdybuddy-funfact: tells an educational fun fact
        /studdybuddy-help: displays this help message
        `
    });
});

app.command("/studdybuddy-add-homework", async ({ command, ack, respond }) => {
    await ack();


    const text = command.text;

    await respond({
        text: "You entered: " + text
    });

    const subject = text.split(" ")[0].trim();
    const task = text.split(" ")[1].trim();
    const dueDate = text.split(" ")[2].trim();

    homework.push({
        subject: subject,
        task: task,
        dueDate: dueDate
    });
});

app.command("/studdybuddy-view-homework", async ({ ack, respond }) => {
    await ack();

    if (homework.length == 0) {
        await respond({
            text: "No homework assignments saved."
        });
    } else {
        for (let i = 0; i < homework.length; i++) {
            await respond({
                text: `
                *Subject: * ${homework[i].subject}
            *Task: * ${homework[i].task}
            *Due Date: * ${homework[i].dueDate}
                `
            });
        }
    }
});

app.command("/studdybuddy-remind", async ({ command, ack, respond }) => {
    console.log("received");
    await ack();

    const parts = command.text.split(",");

    const assignment = parts[0].trim();
    const time = Number(parts[1].trim());

    await respond({
        text: "I'll remind you about " + assignment + " in " + time + " minutes!"
    });

    setTimeout(async () => {
        await respond({
        text: "Reminder! Do " + assignment + " now."
    });
    }, time * 60 * 1000);
});

app.command("/studdybuddy-funfact", async({ack, respond}) => {
    console.log("received");
    await ack();

    try {
        const response = await axios.get("https://api.api-ninjas.com/v1/facts", {
            headers: {
                "X-Api-Key": process.env.NINJAS_API_KEY
            }
        });

        const data = response.data;

        await respond({
            text: `fun fact:\n${data[0].fact}`
        });
    }

    catch(err) {
        console.error(err);
        await respond({
            text: "Sorry, I couldn't fetch a fun fact at the moment. Please try again later."
        });
    }
});



(async () => {
    await app.start();
    console.log("Bot is running.");
})();