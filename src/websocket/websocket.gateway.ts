import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  WebSocketServer,
  MessageBody,
  SubscribeMessage,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway(4001, {
  path: "/socket.io", // 기본 path로 설정
  cors: {
    origin: "http://localhost:8000", // 클라이언트 도메인 허용
    methods: ["GET", "POST"], // 허용할 HTTP 메서드
    credentials: true, // 쿠키 전송 허용
  },
  namespace: "student-state",
})
export class WebSocketGatewayService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log(`WebSocket Server Initialized,${server}`);
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    const token = client.handshake.auth?.token;
    if (!token) {
      console.log("Invalid token, closing connection");
      client.disconnect();
      return;
    }
    console.log("Client connected:", client.id);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log("Client disconnected:", client.id);
  }
  sendNewStudentStateNotification(payload: any) {
    this.server.emit("NEW_STUDENTSTATE", payload);
    console.log(`Notification sent: ${JSON.stringify(payload)}`);
  }
}
