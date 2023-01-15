import convict from 'convict';

const convictConfig = convict({
  env: {
    doc: 'Environment.',
    format: ['pro', 'dev', 'test'],
    env: 'NODE_ENV',
    default: 'dev'
  },
  mongo: {
    url: {
      doc: 'Mongo URL.',
      env: 'MONGO_URL',
      default: 'mongodb://localhost:27017/backoffice-backend-dev'
    }
  }
});

export default convictConfig;
