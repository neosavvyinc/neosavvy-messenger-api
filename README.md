### Neosavvy Messenger API

This project aims to help demonstrate my capabilities via the implementation of
a messenger API in a few programming languages. 

Instructions for what is being attempted can be found in the [Instructions](./instructions.md)

The todo list for accomplishing thie goals in a reasonable period of time can be [found here](./todo.md)

There are a number of technologies I'll be learning quite a bit about as I go along and I'll keep [notes on my findings](./findings.md)

### TL;DR;

Run the following

`docker-compose up`

Import the two environment files from the `postman-tests` folder into Postman. 
Import the NeosavvyMessgerAPI.postman_collection.json file into Postman.

 - Create a few users (Endpoint: `http://{{hostname}}:{{port}}/users`)
 - Send a few Messages (Endpoint: `http://{{hostname}}:{{port}}/messages/1/text`)
 - Fetch the Messages (Endpoint: `http://{{hostname}}:{{port}}/messages/1/receiver/2`)
 
 Hopefully it's clear enough how to consume the API, and there are plenty of additions that could be
 made to this simple message API. 