
import * as matchInfoFactory from './../setup/matchInfoFactory';

export function setupSimulation(playerInfo, cpuInfo) {
  var matchInfo = matchInfoFactory.createMatchInfo(playerInfo.hash, cpuInfo.hash);
  return matchInfo;
}
