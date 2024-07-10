import { DynamicModule, Module } from '@nestjs/common';
import { ConnectionOptions, createConnection } from 'typeorm';

@Module({
})
export class DynamicDatabaseModule {
    static register(options:ConnectionOptions): DynamicModule {
        return {
            module: DynamicDatabaseModule,
            providers: [
                {
                    provide:'CONNECTION',
                    useValue: createConnection(options)
                }
            ]
        }
        
    }
}
