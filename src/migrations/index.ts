import * as migration_20261004_192212 from './20261004_192212';

export const migrations = [
  {
    up: migration_20261004_192212.up,
    down: migration_20261004_192212.down,
    name: '20261004_192212'
  },
];
