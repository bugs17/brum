FROM reactnativecommunity/react-native-android:latest

# Install EAS CLI secara global agar bisa dipanggil langsung
RUN npm install -g eas-cli

WORKDIR /app

# Container akan tetap hidup agar bisa kita exec kapan saja
CMD ["tail", "-f", "/dev/null"]