import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { cairo, uint256, Uint256 } from 'starknet';

@Controller()
export class AppController {
  private userNFTs = new Map<string, string[]>();
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('event')
  event(@Body() body) {
    console.log(body);
    const from = body[1];
    const to = body[2];
    const tokenId = uint256
      .uint256ToBN({ low: body[3], high: body[4] })
      .toString();
    console.log(from, to, tokenId);
    if (this.userNFTs.has(from)) {
      let nfts = this.userNFTs.get(from);
      let index = nfts.lastIndexOf(tokenId);
      if (index != -1) {
        nfts.splice(index, 1);
        this.userNFTs.set(from, nfts);
      }
    } else {
    }

    if (this.userNFTs.has(to)) {
      let nfts = this.userNFTs.get(to);
      nfts.push(tokenId);
      this.userNFTs.set(to, nfts);
    } else {
      this.userNFTs.set(to, [tokenId]);
    }
  }

  @Get('nfts')
  getNFTs(@Req() req) {
    console.log(this.userNFTs);
    if (req.query && req.query.address) {
      return this.userNFTs.get(req.query.address);
    }
  }
}
