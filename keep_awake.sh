#!/bin/bash
curl -s https://safe-wander-backend.onrender.com/health > /dev/null
echo "Pinged at $(date)"