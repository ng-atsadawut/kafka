package main

import (
 "fmt"
 "log"

 "github.com/ng-atsadawut/go-kafka/config"
 "github.com/ng-atsadawut/go-kafka/pkg/utils"
)

func main() {
 cfg := config.KafkaConnCfg{
  Url:   "localhost:9092",
  Topic: "stamp",
 }
 conn := utils.KafkaConn(cfg)

 for {
  message, err := conn.ReadMessage(10e3)
  if err != nil {
   break
  }
  fmt.Println(string(message.Value))
 }

 if err := conn.Close(); err != nil {
  log.Fatal("failed to close connection:", err)
 }
}