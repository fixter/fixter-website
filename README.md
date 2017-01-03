# Fixter Website
This is the main fixter webiste.

## Set up
To properly run the site you will have to set up docker and docker-compose on your computer.

- Go to the the docker website and download Docker for Windows/Mac. It should come with docker-compose.
- Once you have docker installed, go to the command line and verify with `docker -v` and `docker-compose -v`
- Install the git repo.
- Then you run `docker-compose build` in the project to build the docker containers.
- Then run run `docker-compose up` to start the app. You can now go to http://localhost:3000 to visit the site.
- Something about admin panel here.
- To stop docker-compose simple ^c. And then if you need to get rid of the volumes or containers run `docker-compose down`
