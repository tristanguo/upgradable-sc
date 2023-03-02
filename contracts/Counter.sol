// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract Counter {
  uint256 private count;

  function up() public {
    count++;
  }

  function getCount() public view returns (uint256) {
    return count;
  }

  function version() public pure returns (uint256) {
    return 1;
  }
}
