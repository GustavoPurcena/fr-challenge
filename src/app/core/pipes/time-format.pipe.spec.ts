
import { TimeFormatPipe } from "@core/pipes/time-format.pipe"

describe('TimeFormatPipe', () => {
  let pipe: TimeFormatPipe;

  beforeEach(() => {
    pipe = new TimeFormatPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format time correctly', () => {
    const input = '2023-10-11 12:34:56';
    const output = pipe.transform(input);
    expect(output).toEqual('12:34:56');
  });

  it('should pad single digit hours, minutes, and seconds with zeros', () => {
    const input = '2023-10-09 05:04:03';
    const output = pipe.transform(input);
    expect(output).toEqual('05:04:03');
  });

  it('should return an empty string for invalid input', () => {
    const input = 'invalid-input';
    const output = pipe.transform(input);
    expect(output).toEqual('');
  });
});