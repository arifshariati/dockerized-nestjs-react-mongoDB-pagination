const config = {
    mongo: {
        uri: 'mongodb://admin:admin@mongodb:27017/nestjs-react-pagination?authSource=admin',
        config: {
            useNewUrlParser: true,
            useFindAndModify: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            autoCreate: true,
        },
    }
}
export default config;