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
  path: "/ws",
})
export class WebSocketGatewayService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    const address = server.httpServer?.address();
    if (typeof address === "object" && address !== null) {
      console.log("WebSocket Server Initialized on port:", address.port);
    } else {
      console.log("WebSocket Server Initialized");
    }
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    const token = client.handshake.query.token;
    if (!token) {
      console.log("Invalid token, closing connection");
      client.disconnect();
      return;
    }
    console.log(
      "Client connected, total clients:",
      this.server.engine.clientsCount,
    );
  }

  handleDisconnect() {
    console.log("Client disconnected");
  }

  // 상담 문의 생성 시 영업팀에 메시지 전송(예시)
  // sendMessageToSalesTeam(data: any) {
  //   this.server.emit('new_inquiry', data); // 'new_inquiry' 이벤트로 모든 클라이언트에 메시지 전송
  // }

  @SubscribeMessage("message")
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log("Received message:", message);
    client.emit("response", { type: "RESPONSE", data: "Hello Client!" });
  }
  // 토큰 검증 함수
  // private validateToken(token: string): boolean {
  //   if (!token || token !== "valid_token_example") {
  //     return false;
  //   }
  //   return true;
  // }
}
