import { Controller, Get, Headers, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { LiveService } from '../services/live.service';

@Controller('live')
export class LiveController {
  constructor(private readonly liveService: LiveService) {}

  @Get('/watch')
  watch(
    @Res({ passthrough: true }) res: Response,
    @Headers('range') range: string,
  ) {
    const { end, start, streamableFile, videoSize } =
      this.liveService.watch(range);

    const contentLength = end - start + 1;

    console.log(`${start}-${end}/${videoSize}`, contentLength);
    res.set({
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    });

    // streamableFile.on('data', (chunk) => console.log(chunk)); // <--- the data log gets printed
    // streamableFile.on('end', () => console.log('done'));
    // streamableFile.on('error', (err) => {
    //   console.error(err);
    // });

    return streamableFile;
  }
}
