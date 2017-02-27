# NodeEmberMongo
This app works on Node Ember Mongo. Very Basic

On the server run node server.js
and on client side run ember s


To connect to the EC2 Instance - 
do this - 
ssh -i "key" ubuntu@ip

To open up certain ports - do this 
iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000