import {
  BadRequestException,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class LiveService {
  watch(range: string = '0') {
    if (!range) {
      throw new BadRequestException('Requires Range header');
    }
    const videoPath = 'src/videos/teste-stream-verylow.mp4';

    const videoSize = fs.statSync(
      `http://localhost:8000/live/STREAM_NAME.flv`,
    ).size;

    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ''));

    const end = videoSize;

    const file = fs.createReadStream(
      `http://localhost:8000/live/STREAM_NAME.flv`,
      {
        start,
        end,
      },
    );

    return {
      start,
      end,
      videoSize,
      // contentLength,
      streamableFile: new StreamableFile(file),
    };
  }
}
