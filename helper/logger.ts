import chalk from 'chalk'
import Color from './color'



class Logger {
    log(log: any, color?: Color) {
        // tslint:disable-next-line: no-console
        if (color) console.log(chalk.hex(color)(log))
        // tslint:disable-next-line: no-console
        else console.log(log)
    }
}

export default new Logger()