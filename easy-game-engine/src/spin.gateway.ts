import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SpinRequestDto, SpinResultDto } from './spin.dto'
import { AppService } from './app.service';

@WebSocketGateway({
    cors: { origin: '*' }
})
export class SpinGateway {
    constructor(private readonly appService: AppService) {}

    @SubscribeMessage('spin')
    handleSpin(
        @MessageBody() rawData: any,
        @ConnectedSocket() client: Socket,
    ): { event: string, data: SpinResultDto } {
        const data: SpinRequestDto = typeof rawData === 'string'
            ? JSON.parse(rawData)
            : rawData;
        const result = this.appService.spin(data);

        return { event: 'spin_result', data: result };
    }
}