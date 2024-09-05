export const TokenContractABI = {
  abi: [
    {
      type: "constructor",
      inputs: [
        { name: "_name", type: "string", internalType: "string" },
        { name: "_symbol", type: "string", internalType: "string" },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "allowance",
      inputs: [
        { name: "owner", type: "address", internalType: "address" },
        { name: "spender", type: "address", internalType: "address" },
      ],
      outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "approve",
      inputs: [
        { name: "spender", type: "address", internalType: "address" },
        { name: "value", type: "uint256", internalType: "uint256" },
      ],
      outputs: [{ name: "", type: "bool", internalType: "bool" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "balanceOf",
      inputs: [{ name: "account", type: "address", internalType: "address" }],
      outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "decimals",
      inputs: [],
      outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "mint",
      inputs: [
        { name: "to", type: "address", internalType: "address" },
        { name: "amount", type: "uint256", internalType: "uint256" },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "name",
      inputs: [],
      outputs: [{ name: "", type: "string", internalType: "string" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "symbol",
      inputs: [],
      outputs: [{ name: "", type: "string", internalType: "string" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "totalSupply",
      inputs: [],
      outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "transfer",
      inputs: [
        { name: "to", type: "address", internalType: "address" },
        { name: "value", type: "uint256", internalType: "uint256" },
      ],
      outputs: [{ name: "", type: "bool", internalType: "bool" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "transferFrom",
      inputs: [
        { name: "from", type: "address", internalType: "address" },
        { name: "to", type: "address", internalType: "address" },
        { name: "value", type: "uint256", internalType: "uint256" },
      ],
      outputs: [{ name: "", type: "bool", internalType: "bool" }],
      stateMutability: "nonpayable",
    },
    {
      type: "event",
      name: "Approval",
      inputs: [
        {
          name: "owner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "spender",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "value",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "Transfer",
      inputs: [
        {
          name: "from",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        { name: "to", type: "address", indexed: true, internalType: "address" },
        {
          name: "value",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "error",
      name: "ERC20InsufficientAllowance",
      inputs: [
        { name: "spender", type: "address", internalType: "address" },
        { name: "allowance", type: "uint256", internalType: "uint256" },
        { name: "needed", type: "uint256", internalType: "uint256" },
      ],
    },
    {
      type: "error",
      name: "ERC20InsufficientBalance",
      inputs: [
        { name: "sender", type: "address", internalType: "address" },
        { name: "balance", type: "uint256", internalType: "uint256" },
        { name: "needed", type: "uint256", internalType: "uint256" },
      ],
    },
    {
      type: "error",
      name: "ERC20InvalidApprover",
      inputs: [{ name: "approver", type: "address", internalType: "address" }],
    },
    {
      type: "error",
      name: "ERC20InvalidReceiver",
      inputs: [{ name: "receiver", type: "address", internalType: "address" }],
    },
    {
      type: "error",
      name: "ERC20InvalidSender",
      inputs: [{ name: "sender", type: "address", internalType: "address" }],
    },
    {
      type: "error",
      name: "ERC20InvalidSpender",
      inputs: [{ name: "spender", type: "address", internalType: "address" }],
    },
  ],
  bytecode: {
    object:
      "0x608060405234801561001057600080fd5b50604051610a51380380610a5183398101604081905261002f9161010d565b8181600361003d83826101ff565b50600461004a82826101ff565b50505050506102bd565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261007b57600080fd5b81516001600160401b0381111561009457610094610054565b604051601f8201601f19908116603f011681016001600160401b03811182821017156100c2576100c2610054565b6040528181528382016020018510156100da57600080fd5b60005b828110156100f9576020818601810151838301820152016100dd565b506000918101602001919091529392505050565b6000806040838503121561012057600080fd5b82516001600160401b0381111561013657600080fd5b6101428582860161006a565b602085015190935090506001600160401b0381111561016057600080fd5b61016c8582860161006a565b9150509250929050565b600181811c9082168061018a57607f821691505b6020821081036101aa57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156101fa57806000526020600020601f840160051c810160208510156101d75750805b601f840160051c820191505b818110156101f757600081556001016101e3565b50505b505050565b81516001600160401b0381111561021857610218610054565b61022c816102268454610176565b846101b0565b6020601f82116001811461026057600083156102485750848201515b600019600385901b1c1916600184901b1784556101f7565b600084815260208120601f198516915b828110156102905787850151825560209485019460019092019101610270565b50848210156102ae5786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b610785806102cc6000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c806340c10f191161006657806340c10f191461011857806370a082311461012d57806395d89b4114610156578063a9059cbb1461015e578063dd62ed3e1461017157600080fd5b806306fdde03146100a3578063095ea7b3146100c157806318160ddd146100e457806323b872dd146100f6578063313ce56714610109575b600080fd5b6100ab6101aa565b6040516100b891906105ce565b60405180910390f35b6100d46100cf366004610638565b61023c565b60405190151581526020016100b8565b6002545b6040519081526020016100b8565b6100d4610104366004610662565b610256565b604051601281526020016100b8565b61012b610126366004610638565b61027a565b005b6100e861013b36600461069f565b6001600160a01b031660009081526020819052604090205490565b6100ab610288565b6100d461016c366004610638565b610297565b6100e861017f3660046106c1565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101b9906106f4565b80601f01602080910402602001604051908101604052809291908181526020018280546101e5906106f4565b80156102325780601f1061020757610100808354040283529160200191610232565b820191906000526020600020905b81548152906001019060200180831161021557829003601f168201915b5050505050905090565b60003361024a8185856102a5565b60019150505b92915050565b6000336102648582856102b7565b61026f85858561033a565b506001949350505050565b6102848282610399565b5050565b6060600480546101b9906106f4565b60003361024a81858561033a565b6102b283838360016103cf565b505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198114610334578181101561032557604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064015b60405180910390fd5b610334848484840360006103cf565b50505050565b6001600160a01b03831661036457604051634b637e8f60e11b81526000600482015260240161031c565b6001600160a01b03821661038e5760405163ec442f0560e01b81526000600482015260240161031c565b6102b28383836104a4565b6001600160a01b0382166103c35760405163ec442f0560e01b81526000600482015260240161031c565b610284600083836104a4565b6001600160a01b0384166103f95760405163e602df0560e01b81526000600482015260240161031c565b6001600160a01b03831661042357604051634a1406b160e11b81526000600482015260240161031c565b6001600160a01b038085166000908152600160209081526040808320938716835292905220829055801561033457826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161049691815260200190565b60405180910390a350505050565b6001600160a01b0383166104cf5780600260008282546104c4919061072e565b909155506105419050565b6001600160a01b038316600090815260208190526040902054818110156105225760405163391434e360e21b81526001600160a01b0385166004820152602481018290526044810183905260640161031c565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b03821661055d5760028054829003905561057c565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516105c191815260200190565b60405180910390a3505050565b602081526000825180602084015260005b818110156105fc57602081860181015160408684010152016105df565b506000604082850101526040601f19601f83011684010191505092915050565b80356001600160a01b038116811461063357600080fd5b919050565b6000806040838503121561064b57600080fd5b6106548361061c565b946020939093013593505050565b60008060006060848603121561067757600080fd5b6106808461061c565b925061068e6020850161061c565b929592945050506040919091013590565b6000602082840312156106b157600080fd5b6106ba8261061c565b9392505050565b600080604083850312156106d457600080fd5b6106dd8361061c565b91506106eb6020840161061c565b90509250929050565b600181811c9082168061070857607f821691505b60208210810361072857634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561025057634e487b7160e01b600052601160045260246000fdfea2646970667358221220aabcb178d92d2e92078bd5ddcd11a92bd87a2c2e0157284a7a7532b9d6c98c4d64736f6c634300081a0033",
    sourceMap:
      "115:223:5:-:0;;;145:102;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;229:5;236:7;1962:5:1;:13;229:5:5;1962::1;:13;:::i;:::-;-1:-1:-1;1985:7:1;:17;1995:7;1985;:17;:::i;:::-;;1896:113;;145:102:5;;115:223;;14:127:6;75:10;70:3;66:20;63:1;56:31;106:4;103:1;96:15;130:4;127:1;120:15;146:834;200:5;253:3;246:4;238:6;234:17;230:27;220:55;;271:1;268;261:12;220:55;298:13;;-1:-1:-1;;;;;323:30:6;;320:56;;;356:18;;:::i;:::-;405:2;399:9;497:2;459:17;;-1:-1:-1;;455:31:6;;;488:2;451:40;447:54;435:67;;-1:-1:-1;;;;;517:34:6;;553:22;;;514:62;511:88;;;579:18;;:::i;:::-;615:2;608:22;639;;;680:19;;;701:4;676:30;673:39;-1:-1:-1;670:59:6;;;725:1;722;715:12;670:59;747:1;757:143;771:6;768:1;765:13;757:143;;;883:4;867:14;;;863:25;;857:32;834:14;;;830:25;;823:67;786:12;757:143;;;-1:-1:-1;948:1:6;920:19;;;941:4;916:30;909:41;;;;924:6;146:834;-1:-1:-1;;;146:834:6:o;985:557::-;1084:6;1092;1145:2;1133:9;1124:7;1120:23;1116:32;1113:52;;;1161:1;1158;1151:12;1113:52;1188:16;;-1:-1:-1;;;;;1216:30:6;;1213:50;;;1259:1;1256;1249:12;1213:50;1282:61;1335:7;1326:6;1315:9;1311:22;1282:61;:::i;:::-;1389:2;1374:18;;1368:25;1272:71;;-1:-1:-1;1368:25:6;-1:-1:-1;;;;;;1405:32:6;;1402:52;;;1450:1;1447;1440:12;1402:52;1473:63;1528:7;1517:8;1506:9;1502:24;1473:63;:::i;:::-;1463:73;;;985:557;;;;;:::o;1547:380::-;1626:1;1622:12;;;;1669;;;1690:61;;1744:4;1736:6;1732:17;1722:27;;1690:61;1797:2;1789:6;1786:14;1766:18;1763:38;1760:161;;1843:10;1838:3;1834:20;1831:1;1824:31;1878:4;1875:1;1868:15;1906:4;1903:1;1896:15;1760:161;;1547:380;;;:::o;2058:518::-;2160:2;2155:3;2152:11;2149:421;;;2196:5;2193:1;2186:16;2240:4;2237:1;2227:18;2310:2;2298:10;2294:19;2291:1;2287:27;2281:4;2277:38;2346:4;2334:10;2331:20;2328:47;;;-1:-1:-1;2369:4:6;2328:47;2424:2;2419:3;2415:12;2412:1;2408:20;2402:4;2398:31;2388:41;;2479:81;2497:2;2490:5;2487:13;2479:81;;;2556:1;2542:16;;2523:1;2512:13;2479:81;;;2483:3;;2149:421;2058:518;;;:::o;2752:1299::-;2872:10;;-1:-1:-1;;;;;2894:30:6;;2891:56;;;2927:18;;:::i;:::-;2956:97;3046:6;3006:38;3038:4;3032:11;3006:38;:::i;:::-;3000:4;2956:97;:::i;:::-;3102:4;3133:2;3122:14;;3150:1;3145:649;;;;3838:1;3855:6;3852:89;;;-1:-1:-1;3907:19:6;;;3901:26;3852:89;-1:-1:-1;;2709:1:6;2705:11;;;2701:24;2697:29;2687:40;2733:1;2729:11;;;2684:57;3954:81;;3115:930;;3145:649;2005:1;1998:14;;;2042:4;2029:18;;-1:-1:-1;;3181:20:6;;;3299:222;3313:7;3310:1;3307:14;3299:222;;;3395:19;;;3389:26;3374:42;;3502:4;3487:20;;;;3455:1;3443:14;;;;3329:12;3299:222;;;3303:3;3549:6;3540:7;3537:19;3534:201;;;3610:19;;;3604:26;-1:-1:-1;;3693:1:6;3689:14;;;3705:3;3685:24;3681:37;3677:42;3662:58;3647:74;;3534:201;-1:-1:-1;;;;3781:1:6;3765:14;;;3761:22;3748:36;;-1:-1:-1;2752:1299:6:o;:::-;115:223:5;;;;;;",
    linkReferences: {},
  },
  deployedBytecode: {
    object:
      "0x608060405234801561001057600080fd5b506004361061009e5760003560e01c806340c10f191161006657806340c10f191461011857806370a082311461012d57806395d89b4114610156578063a9059cbb1461015e578063dd62ed3e1461017157600080fd5b806306fdde03146100a3578063095ea7b3146100c157806318160ddd146100e457806323b872dd146100f6578063313ce56714610109575b600080fd5b6100ab6101aa565b6040516100b891906105ce565b60405180910390f35b6100d46100cf366004610638565b61023c565b60405190151581526020016100b8565b6002545b6040519081526020016100b8565b6100d4610104366004610662565b610256565b604051601281526020016100b8565b61012b610126366004610638565b61027a565b005b6100e861013b36600461069f565b6001600160a01b031660009081526020819052604090205490565b6100ab610288565b6100d461016c366004610638565b610297565b6100e861017f3660046106c1565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101b9906106f4565b80601f01602080910402602001604051908101604052809291908181526020018280546101e5906106f4565b80156102325780601f1061020757610100808354040283529160200191610232565b820191906000526020600020905b81548152906001019060200180831161021557829003601f168201915b5050505050905090565b60003361024a8185856102a5565b60019150505b92915050565b6000336102648582856102b7565b61026f85858561033a565b506001949350505050565b6102848282610399565b5050565b6060600480546101b9906106f4565b60003361024a81858561033a565b6102b283838360016103cf565b505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198114610334578181101561032557604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064015b60405180910390fd5b610334848484840360006103cf565b50505050565b6001600160a01b03831661036457604051634b637e8f60e11b81526000600482015260240161031c565b6001600160a01b03821661038e5760405163ec442f0560e01b81526000600482015260240161031c565b6102b28383836104a4565b6001600160a01b0382166103c35760405163ec442f0560e01b81526000600482015260240161031c565b610284600083836104a4565b6001600160a01b0384166103f95760405163e602df0560e01b81526000600482015260240161031c565b6001600160a01b03831661042357604051634a1406b160e11b81526000600482015260240161031c565b6001600160a01b038085166000908152600160209081526040808320938716835292905220829055801561033457826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161049691815260200190565b60405180910390a350505050565b6001600160a01b0383166104cf5780600260008282546104c4919061072e565b909155506105419050565b6001600160a01b038316600090815260208190526040902054818110156105225760405163391434e360e21b81526001600160a01b0385166004820152602481018290526044810183905260640161031c565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b03821661055d5760028054829003905561057c565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516105c191815260200190565b60405180910390a3505050565b602081526000825180602084015260005b818110156105fc57602081860181015160408684010152016105df565b506000604082850101526040601f19601f83011684010191505092915050565b80356001600160a01b038116811461063357600080fd5b919050565b6000806040838503121561064b57600080fd5b6106548361061c565b946020939093013593505050565b60008060006060848603121561067757600080fd5b6106808461061c565b925061068e6020850161061c565b929592945050506040919091013590565b6000602082840312156106b157600080fd5b6106ba8261061c565b9392505050565b600080604083850312156106d457600080fd5b6106dd8361061c565b91506106eb6020840161061c565b90509250929050565b600181811c9082168061070857607f821691505b60208210810361072857634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561025057634e487b7160e01b600052601160045260246000fdfea2646970667358221220aabcb178d92d2e92078bd5ddcd11a92bd87a2c2e0157284a7a7532b9d6c98c4d64736f6c634300081a0033",
    sourceMap:
      "115:223:5:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2074:89:1;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;4293:186;;;;;;:::i;:::-;;:::i;:::-;;;1194:14:6;;1187:22;1169:41;;1157:2;1142:18;4293:186:1;1029:187:6;3144:97:1;3222:12;;3144:97;;;1367:25:6;;;1355:2;1340:18;3144:97:1;1221:177:6;5039:244:1;;;;;;:::i;:::-;;:::i;3002:82::-;;;3075:2;1924:36:6;;1912:2;1897:18;3002:82:1;1782:184:6;253:83:5;;;;;;:::i;:::-;;:::i;:::-;;3299:116:1;;;;;;:::i;:::-;-1:-1:-1;;;;;3390:18:1;3364:7;3390:18;;;;;;;;;;;;3299:116;2276:93;;;:::i;3610:178::-;;;;;;:::i;:::-;;:::i;3846:140::-;;;;;;:::i;:::-;-1:-1:-1;;;;;3952:18:1;;;3926:7;3952:18;;;:11;:18;;;;;;;;:27;;;;;;;;;;;;;3846:140;2074:89;2119:13;2151:5;2144:12;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2074:89;:::o;4293:186::-;4366:4;735:10:4;4420:31:1;735:10:4;4436:7:1;4445:5;4420:8;:31::i;:::-;4468:4;4461:11;;;4293:186;;;;;:::o;5039:244::-;5126:4;735:10:4;5182:37:1;5198:4;735:10:4;5213:5:1;5182:15;:37::i;:::-;5229:26;5239:4;5245:2;5249:5;5229:9;:26::i;:::-;-1:-1:-1;5272:4:1;;5039:244;-1:-1:-1;;;;5039:244:1:o;253:83:5:-;312:17;318:2;322:6;312:5;:17::i;:::-;253:83;;:::o;2276:93:1:-;2323:13;2355:7;2348:14;;;;;:::i;3610:178::-;3679:4;735:10:4;3733:27:1;735:10:4;3750:2:1;3754:5;3733:9;:27::i;8989:128::-;9073:37;9082:5;9089:7;9098:5;9105:4;9073:8;:37::i;:::-;8989:128;;;:::o;10663:477::-;-1:-1:-1;;;;;3952:18:1;;;10762:24;3952:18;;;:11;:18;;;;;;;;:27;;;;;;;;;;-1:-1:-1;;10828:37:1;;10824:310;;10904:5;10885:16;:24;10881:130;;;10936:60;;-1:-1:-1;;;10936:60:1;;-1:-1:-1;;;;;3032:32:6;;10936:60:1;;;3014:51:6;3081:18;;;3074:34;;;3124:18;;;3117:34;;;2987:18;;10936:60:1;;;;;;;;10881:130;11052:57;11061:5;11068:7;11096:5;11077:16;:24;11103:5;11052:8;:57::i;:::-;10752:388;10663:477;;;:::o;5656:300::-;-1:-1:-1;;;;;5739:18:1;;5735:86;;5780:30;;-1:-1:-1;;;5780:30:1;;5807:1;5780:30;;;3308:51:6;3281:18;;5780:30:1;3162:203:6;5735:86:1;-1:-1:-1;;;;;5834:16:1;;5830:86;;5873:32;;-1:-1:-1;;;5873:32:1;;5902:1;5873:32;;;3308:51:6;3281:18;;5873:32:1;3162:203:6;5830:86:1;5925:24;5933:4;5939:2;5943:5;5925:7;:24::i;7721:208::-;-1:-1:-1;;;;;7791:21:1;;7787:91;;7835:32;;-1:-1:-1;;;7835:32:1;;7864:1;7835:32;;;3308:51:6;3281:18;;7835:32:1;3162:203:6;7787:91:1;7887:35;7903:1;7907:7;7916:5;7887:7;:35::i;9949:432::-;-1:-1:-1;;;;;10061:19:1;;10057:89;;10103:32;;-1:-1:-1;;;10103:32:1;;10132:1;10103:32;;;3308:51:6;3281:18;;10103:32:1;3162:203:6;10057:89:1;-1:-1:-1;;;;;10159:21:1;;10155:90;;10203:31;;-1:-1:-1;;;10203:31:1;;10231:1;10203:31;;;3308:51:6;3281:18;;10203:31:1;3162:203:6;10155:90:1;-1:-1:-1;;;;;10254:18:1;;;;;;;:11;:18;;;;;;;;:27;;;;;;;;;:35;;;10299:76;;;;10349:7;-1:-1:-1;;;;;10333:31:1;10342:5;-1:-1:-1;;;;;10333:31:1;;10358:5;10333:31;;;;1367:25:6;;1355:2;1340:18;;1221:177;10333:31:1;;;;;;;;9949:432;;;;:::o;6271:1107::-;-1:-1:-1;;;;;6360:18:1;;6356:540;;6512:5;6496:12;;:21;;;;;;;:::i;:::-;;;;-1:-1:-1;6356:540:1;;-1:-1:-1;6356:540:1;;-1:-1:-1;;;;;6570:15:1;;6548:19;6570:15;;;;;;;;;;;6603:19;;;6599:115;;;6649:50;;-1:-1:-1;;;6649:50:1;;-1:-1:-1;;;;;3032:32:6;;6649:50:1;;;3014:51:6;3081:18;;;3074:34;;;3124:18;;;3117:34;;;2987:18;;6649:50:1;2812:345:6;6599:115:1;-1:-1:-1;;;;;6834:15:1;;:9;:15;;;;;;;;;;6852:19;;;;6834:37;;6356:540;-1:-1:-1;;;;;6910:16:1;;6906:425;;7073:12;:21;;;;;;;6906:425;;;-1:-1:-1;;;;;7284:13:1;;:9;:13;;;;;;;;;;:22;;;;;;6906:425;7361:2;-1:-1:-1;;;;;7346:25:1;7355:4;-1:-1:-1;;;;;7346:25:1;;7365:5;7346:25;;;;1367::6;;1355:2;1340:18;;1221:177;7346:25:1;;;;;;;;6271:1107;;;:::o;14:527:6:-;163:2;152:9;145:21;126:4;195:6;189:13;238:6;233:2;222:9;218:18;211:34;263:1;273:140;287:6;284:1;281:13;273:140;;;398:2;382:14;;;378:23;;372:30;367:2;348:17;;;344:26;337:66;302:10;273:140;;;277:3;462:1;457:2;448:6;437:9;433:22;429:31;422:42;532:2;525;521:7;516:2;508:6;504:15;500:29;489:9;485:45;481:54;473:62;;;14:527;;;;:::o;546:173::-;614:20;;-1:-1:-1;;;;;663:31:6;;653:42;;643:70;;709:1;706;699:12;643:70;546:173;;;:::o;724:300::-;792:6;800;853:2;841:9;832:7;828:23;824:32;821:52;;;869:1;866;859:12;821:52;892:29;911:9;892:29;:::i;:::-;882:39;990:2;975:18;;;;962:32;;-1:-1:-1;;;724:300:6:o;1403:374::-;1480:6;1488;1496;1549:2;1537:9;1528:7;1524:23;1520:32;1517:52;;;1565:1;1562;1555:12;1517:52;1588:29;1607:9;1588:29;:::i;:::-;1578:39;;1636:38;1670:2;1659:9;1655:18;1636:38;:::i;:::-;1403:374;;1626:48;;-1:-1:-1;;;1743:2:6;1728:18;;;;1715:32;;1403:374::o;1971:186::-;2030:6;2083:2;2071:9;2062:7;2058:23;2054:32;2051:52;;;2099:1;2096;2089:12;2051:52;2122:29;2141:9;2122:29;:::i;:::-;2112:39;1971:186;-1:-1:-1;;;1971:186:6:o;2162:260::-;2230:6;2238;2291:2;2279:9;2270:7;2266:23;2262:32;2259:52;;;2307:1;2304;2297:12;2259:52;2330:29;2349:9;2330:29;:::i;:::-;2320:39;;2378:38;2412:2;2401:9;2397:18;2378:38;:::i;:::-;2368:48;;2162:260;;;;;:::o;2427:380::-;2506:1;2502:12;;;;2549;;;2570:61;;2624:4;2616:6;2612:17;2602:27;;2570:61;2677:2;2669:6;2666:14;2646:18;2643:38;2640:161;;2723:10;2718:3;2714:20;2711:1;2704:31;2758:4;2755:1;2748:15;2786:4;2783:1;2776:15;2640:161;;2427:380;;;:::o;3370:222::-;3435:9;;;3456:10;;;3453:133;;;3508:10;3503:3;3499:20;3496:1;3489:31;3543:4;3540:1;3533:15;3571:4;3568:1;3561:15",
    linkReferences: {},
  },
  methodIdentifiers: {
    "allowance(address,address)": "dd62ed3e",
    "approve(address,uint256)": "095ea7b3",
    "balanceOf(address)": "70a08231",
    "decimals()": "313ce567",
    "mint(address,uint256)": "40c10f19",
    "name()": "06fdde03",
    "symbol()": "95d89b41",
    "totalSupply()": "18160ddd",
    "transfer(address,uint256)": "a9059cbb",
    "transferFrom(address,address,uint256)": "23b872dd",
  },
  rawMetadata:
    '{"compiler":{"version":"0.8.26+commit.8a97fa7a"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],"devdoc":{"errors":{"ERC20InsufficientAllowance(address,uint256,uint256)":[{"details":"Indicates a failure with the `spender`\\u2019s `allowance`. Used in transfers.","params":{"allowance":"Amount of tokens a `spender` is allowed to operate with.","needed":"Minimum amount required to perform a transfer.","spender":"Address that may be allowed to operate on tokens without being their owner."}}],"ERC20InsufficientBalance(address,uint256,uint256)":[{"details":"Indicates an error related to the current `balance` of a `sender`. Used in transfers.","params":{"balance":"Current balance for the interacting account.","needed":"Minimum amount required to perform a transfer.","sender":"Address whose tokens are being transferred."}}],"ERC20InvalidApprover(address)":[{"details":"Indicates a failure with the `approver` of a token to be approved. Used in approvals.","params":{"approver":"Address initiating an approval operation."}}],"ERC20InvalidReceiver(address)":[{"details":"Indicates a failure with the token `receiver`. Used in transfers.","params":{"receiver":"Address to which tokens are being transferred."}}],"ERC20InvalidSender(address)":[{"details":"Indicates a failure with the token `sender`. Used in transfers.","params":{"sender":"Address whose tokens are being transferred."}}],"ERC20InvalidSpender(address)":[{"details":"Indicates a failure with the `spender` to be approved. Used in approvals.","params":{"spender":"Address that may be allowed to operate on tokens without being their owner."}}]},"events":{"Approval(address,address,uint256)":{"details":"Emitted when the allowance of a `spender` for an `owner` is set by a call to {approve}. `value` is the new allowance."},"Transfer(address,address,uint256)":{"details":"Emitted when `value` tokens are moved from one account (`from`) to another (`to`). Note that `value` may be zero."}},"kind":"dev","methods":{"allowance(address,address)":{"details":"See {IERC20-allowance}."},"approve(address,uint256)":{"details":"See {IERC20-approve}. NOTE: If `value` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address."},"balanceOf(address)":{"details":"See {IERC20-balanceOf}."},"decimals()":{"details":"Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the default value returned by this function, unless it\'s overridden. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}."},"name()":{"details":"Returns the name of the token."},"symbol()":{"details":"Returns the symbol of the token, usually a shorter version of the name."},"totalSupply()":{"details":"See {IERC20-totalSupply}."},"transfer(address,uint256)":{"details":"See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `value`."},"transferFrom(address,address,uint256)":{"details":"See {IERC20-transferFrom}. Emits an {Approval} event indicating the updated allowance. This is not required by the EIP. See the note at the beginning of {ERC20}. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `value`. - the caller must have allowance for ``from``\'s tokens of at least `value`."}},"version":1},"userdoc":{"kind":"user","methods":{},"version":1}},"settings":{"compilationTarget":{"src/token/Token.sol":"Token"},"evmVersion":"paris","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@openzeppelin/=lib/openzeppelin-contracts/",":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",":@uniswap/v2-periphery/=lib/v2-periphery/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/",":v2-periphery/=lib/v2-periphery/contracts/"]},"sources":{"lib/openzeppelin-contracts/contracts/interfaces/draft-IERC6093.sol":{"keccak256":"0x60c65f701957fdd6faea1acb0bb45825791d473693ed9ecb34726fdfaa849dd7","license":"MIT","urls":["bzz-raw://ea290300e0efc4d901244949dc4d877fd46e6c5e43dc2b26620e8efab3ab803f","dweb:/ipfs/QmcLLJppxKeJWqHxE2CUkcfhuRTgHSn8J4kijcLa5MYhSt"]},"lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol":{"keccak256":"0xc3e1fa9d1987f8d349dfb4d6fe93bf2ca014b52ba335cfac30bfe71e357e6f80","license":"MIT","urls":["bzz-raw://c5703ccdeb7b1d685e375ed719117e9edf2ab4bc544f24f23b0d50ec82257229","dweb:/ipfs/QmTdwkbQq7owpCiyuzE7eh5LrD2ddrBCZ5WHVsWPi1RrTS"]},"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol":{"keccak256":"0xc6a8ff0ea489379b61faa647490411b80102578440ab9d84e9a957cc12164e70","license":"MIT","urls":["bzz-raw://0ea104e577e63faea3b69c415637e99e755dcbf64c5833d7140c35a714d6d90c","dweb:/ipfs/Qmau6x4Ns9XdyynRCNNp3RhLqijJjFm7z5fyZazfYFGYdq"]},"lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Metadata.sol":{"keccak256":"0xaa761817f6cd7892fcf158b3c776b34551cde36f48ff9703d53898bc45a94ea2","license":"MIT","urls":["bzz-raw://0ad7c8d4d08938c8dfc43d75a148863fb324b80cf53e0a36f7e5a4ac29008850","dweb:/ipfs/QmcrhfPgVNf5mkdhQvy1pMv51TFokD3Y4Wa5WZhFqVh8UV"]},"lib/openzeppelin-contracts/contracts/utils/Context.sol":{"keccak256":"0x493033a8d1b176a037b2cc6a04dad01a5c157722049bbecf632ca876224dd4b2","license":"MIT","urls":["bzz-raw://6a708e8a5bdb1011c2c381c9a5cfd8a9a956d7d0a9dc1bd8bcdaf52f76ef2f12","dweb:/ipfs/Qmax9WHBnVsZP46ZxEMNRQpLQnrdE4dK8LehML1Py8FowF"]},"src/token/Token.sol":{"keccak256":"0x03870b77e8b25ed827b6c7a12fb5c7b28badf8f6ad64034e99c9e9f62bab9085","license":"MIT","urls":["bzz-raw://89a1b0f4f4005f3b355a63d9f64d3893b6a0c7000bf2ab75497a737286418a4f","dweb:/ipfs/QmUAET6LGrbkuSbpd4FuR5wDJHptZ4JEw58k9PNiB2zFe4"]}},"version":1}',
  metadata: {
    compiler: { version: "0.8.26+commit.8a97fa7a" },
    language: "Solidity",
    output: {
      abi: [
        {
          inputs: [
            { internalType: "string", name: "_name", type: "string" },
            { internalType: "string", name: "_symbol", type: "string" },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "allowance", type: "uint256" },
            { internalType: "uint256", name: "needed", type: "uint256" },
          ],
          type: "error",
          name: "ERC20InsufficientAllowance",
        },
        {
          inputs: [
            { internalType: "address", name: "sender", type: "address" },
            { internalType: "uint256", name: "balance", type: "uint256" },
            { internalType: "uint256", name: "needed", type: "uint256" },
          ],
          type: "error",
          name: "ERC20InsufficientBalance",
        },
        {
          inputs: [
            { internalType: "address", name: "approver", type: "address" },
          ],
          type: "error",
          name: "ERC20InvalidApprover",
        },
        {
          inputs: [
            { internalType: "address", name: "receiver", type: "address" },
          ],
          type: "error",
          name: "ERC20InvalidReceiver",
        },
        {
          inputs: [
            { internalType: "address", name: "sender", type: "address" },
          ],
          type: "error",
          name: "ERC20InvalidSender",
        },
        {
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
          ],
          type: "error",
          name: "ERC20InvalidSpender",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
              indexed: true,
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
              indexed: true,
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
              indexed: false,
            },
          ],
          type: "event",
          name: "Approval",
          anonymous: false,
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
              indexed: true,
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
              indexed: true,
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
              indexed: false,
            },
          ],
          type: "event",
          name: "Transfer",
          anonymous: false,
        },
        {
          inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "spender", type: "address" },
          ],
          stateMutability: "view",
          type: "function",
          name: "allowance",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        },
        {
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "approve",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
        },
        {
          inputs: [
            { internalType: "address", name: "account", type: "address" },
          ],
          stateMutability: "view",
          type: "function",
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        },
        {
          inputs: [],
          stateMutability: "view",
          type: "function",
          name: "decimals",
          outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        },
        {
          inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "mint",
        },
        {
          inputs: [],
          stateMutability: "view",
          type: "function",
          name: "name",
          outputs: [{ internalType: "string", name: "", type: "string" }],
        },
        {
          inputs: [],
          stateMutability: "view",
          type: "function",
          name: "symbol",
          outputs: [{ internalType: "string", name: "", type: "string" }],
        },
        {
          inputs: [],
          stateMutability: "view",
          type: "function",
          name: "totalSupply",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        },
        {
          inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "transfer",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "transferFrom",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
        },
      ],
      devdoc: {
        kind: "dev",
        methods: {
          "allowance(address,address)": { details: "See {IERC20-allowance}." },
          "approve(address,uint256)": {
            details:
              "See {IERC20-approve}. NOTE: If `value` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address.",
          },
          "balanceOf(address)": { details: "See {IERC20-balanceOf}." },
          "decimals()": {
            details:
              "Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the default value returned by this function, unless it's overridden. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.",
          },
          "name()": { details: "Returns the name of the token." },
          "symbol()": {
            details:
              "Returns the symbol of the token, usually a shorter version of the name.",
          },
          "totalSupply()": { details: "See {IERC20-totalSupply}." },
          "transfer(address,uint256)": {
            details:
              "See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `value`.",
          },
          "transferFrom(address,address,uint256)": {
            details:
              "See {IERC20-transferFrom}. Emits an {Approval} event indicating the updated allowance. This is not required by the EIP. See the note at the beginning of {ERC20}. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `value`. - the caller must have allowance for ``from``'s tokens of at least `value`.",
          },
        },
        version: 1,
      },
      userdoc: { kind: "user", methods: {}, version: 1 },
    },
    settings: {
      remappings: [
        "@openzeppelin/=lib/openzeppelin-contracts/",
        "@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",
        "@uniswap/v2-periphery/=lib/v2-periphery/",
        "ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",
        "erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",
        "forge-std/=lib/forge-std/src/",
        "openzeppelin-contracts/=lib/openzeppelin-contracts/",
        "v2-periphery/=lib/v2-periphery/contracts/",
      ],
      optimizer: { enabled: true, runs: 200 },
      metadata: { bytecodeHash: "ipfs" },
      compilationTarget: { "src/token/Token.sol": "Token" },
      evmVersion: "paris",
      libraries: {},
    },
    sources: {
      "lib/openzeppelin-contracts/contracts/interfaces/draft-IERC6093.sol": {
        keccak256:
          "0x60c65f701957fdd6faea1acb0bb45825791d473693ed9ecb34726fdfaa849dd7",
        urls: [
          "bzz-raw://ea290300e0efc4d901244949dc4d877fd46e6c5e43dc2b26620e8efab3ab803f",
          "dweb:/ipfs/QmcLLJppxKeJWqHxE2CUkcfhuRTgHSn8J4kijcLa5MYhSt",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol": {
        keccak256:
          "0xc3e1fa9d1987f8d349dfb4d6fe93bf2ca014b52ba335cfac30bfe71e357e6f80",
        urls: [
          "bzz-raw://c5703ccdeb7b1d685e375ed719117e9edf2ab4bc544f24f23b0d50ec82257229",
          "dweb:/ipfs/QmTdwkbQq7owpCiyuzE7eh5LrD2ddrBCZ5WHVsWPi1RrTS",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol": {
        keccak256:
          "0xc6a8ff0ea489379b61faa647490411b80102578440ab9d84e9a957cc12164e70",
        urls: [
          "bzz-raw://0ea104e577e63faea3b69c415637e99e755dcbf64c5833d7140c35a714d6d90c",
          "dweb:/ipfs/Qmau6x4Ns9XdyynRCNNp3RhLqijJjFm7z5fyZazfYFGYdq",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Metadata.sol":
        {
          keccak256:
            "0xaa761817f6cd7892fcf158b3c776b34551cde36f48ff9703d53898bc45a94ea2",
          urls: [
            "bzz-raw://0ad7c8d4d08938c8dfc43d75a148863fb324b80cf53e0a36f7e5a4ac29008850",
            "dweb:/ipfs/QmcrhfPgVNf5mkdhQvy1pMv51TFokD3Y4Wa5WZhFqVh8UV",
          ],
          license: "MIT",
        },
      "lib/openzeppelin-contracts/contracts/utils/Context.sol": {
        keccak256:
          "0x493033a8d1b176a037b2cc6a04dad01a5c157722049bbecf632ca876224dd4b2",
        urls: [
          "bzz-raw://6a708e8a5bdb1011c2c381c9a5cfd8a9a956d7d0a9dc1bd8bcdaf52f76ef2f12",
          "dweb:/ipfs/Qmax9WHBnVsZP46ZxEMNRQpLQnrdE4dK8LehML1Py8FowF",
        ],
        license: "MIT",
      },
      "src/token/Token.sol": {
        keccak256:
          "0x03870b77e8b25ed827b6c7a12fb5c7b28badf8f6ad64034e99c9e9f62bab9085",
        urls: [
          "bzz-raw://89a1b0f4f4005f3b355a63d9f64d3893b6a0c7000bf2ab75497a737286418a4f",
          "dweb:/ipfs/QmUAET6LGrbkuSbpd4FuR5wDJHptZ4JEw58k9PNiB2zFe4",
        ],
        license: "MIT",
      },
    },
    version: 1,
  },
  id: 5,
};