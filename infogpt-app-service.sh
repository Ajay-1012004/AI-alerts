#!/bin/bash

# Define the filename
filename="/etc/systemd/system/infogpt-app.service"

# Write text to the file
# The user specified in the User=infogpt entry must be the same user underwhich the node server is running. The 
# Site User in the settings page of the Cloud Planel contains this user name. 
# For example https://ccloud.fdsmax.com/site/infogpt.in/settings contains the Site User value 'infogpt'
echo "[Unit]" > "$filename"
echo "Description=InfoGPT App" >> "$filename"
echo "After=network.target" >> "$filename"
echo "" >> "$filename"
echo "[Service]" >> "$filename"
echo "Type=simple" >> "$filename"
echo "User=infogpt" >> "$filename"
echo "WorkingDirectory=/home/infogpt/htdocs/infogpt.in" >> "$filename"
echo "ExecStart=/usr/local/bin/pnpm start" >> "$filename"
echo "Restart=always" >> "$filename"
echo "Environment=PORT=3000" >> "$filename"
echo "Environment=NODE_ENV=production" >> "$filename"
echo "" >> "$filename"
echo "[Install]" >> "$filename"
echo "WantedBy=multi-user.target" >> "$filename"

cat "$filename"

# ---------------------------
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable infogpt-app
sudo systemctl start infogpt-app

# ---------------------------
