This is a unique slack bot designed for studying help using Javascript and Slack.

To test out this project, go to slack.com and use the /studdybuddy-help command to see all possible commands

Features include:
- 5 different commands
- add-homework: adds homework assignments, stores it in an array
        use: /studdybuddy-add-homework assignmentName subjectName dueDate
        type the assignment name, subject name, and due date separated by spaces
        ex. /studdybuddy-add-homework worksheet Math 08-13-2026 
- view-homework: displays all homework assignments
        use: /studdybuddy-view-homework
- remind: sets a timed reminder and will remind you to do the assignment you set
        use: /studdybuddy-remind subjectName, time
        type the subject name and then the amount of time in minutes, separated by a comma
        ex. /studdybuddy-remind Math, 10 sets a 10 minute study period for math
- fun fact: pulls a fun fact from API Ninjas and tells it
        use: /studdybuddy-funfact
- help: lists all possible commands
        use: /studdybuddy-help
- runs 24/7

This was created with the help of API Ninjas and Nest.
This was designed with the aid of a guide provided by Hack Club's Stardance program.
