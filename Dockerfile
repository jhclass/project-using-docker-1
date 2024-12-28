# Base image
FROM node:18

# 작업 디렉토리 설정
WORKDIR /usr/src/myapp

# package.json과 package-lock.json만 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --legacy-peer-deps

# 앱 소스 복사
COPY . .

# 애플리케이션 포트 노출
EXPOSE 4000

# 실행 명령
CMD ["npm", "run", "start:dev"]