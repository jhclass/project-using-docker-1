FROM node:18

# 작업 디렉토리를 /usr/src/myapp로 설정
WORKDIR /usr/src/myapp

#복사
COPY . .

# 의존성 설치
RUN npm ci --legacy-peer-deps

# 포트 노출
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "run", "start:dev"]