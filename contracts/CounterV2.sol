// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract CounterV2 {
  uint256 private count;

  constructor(uint256 initCount) {
    count = initCount;
  }

  function up() public {
    count = count + 2;
  }

  function getCount() public view returns (uint256) {
    return count;
  }

  function version() public pure returns (uint256) {
    return 2;
  }
}
