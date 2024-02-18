const { Kafka } = require('kafkajs');

// Define the Kafka broker(s)
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'] // Change this to your Kafka broker(s) address
});

// Create a consumer
const consumer = kafka.consumer({ groupId: 'my-group' });

// Connect the consumer to the Kafka cluster
const run = async () => {
  await consumer.connect();
  
  // Subscribe to a topic
  await consumer.subscribe({ topic: 'stamp' });
  
  // Run the consumer to listen for messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(), // Message value
      });
    },
  });
};

// Start the consumer
run().catch(console.error);
