#!/bin/bash
while true; do
  curl -s https://safe-wander-backend.onrender.com/health > /dev/null
  echo "Pinged at $(date)"
  sleep 600  # ping every 10mins
done