/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */

/** NOTE: Send your hate mail to https://css-tricks.com/snippets/javascript/javascript-md5/ */

const RotateLeft = (lValue: number, iShiftBits: number) => {
  return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
};

const AddUnsigned = (lX: number, lY: number) => {
  let lX4: number;
  let lY4: number;
  let lX8: number;
  let lY8: number;
  let lResult: number;

  lX8 = lX & 0x80_00_00_00;

  lY8 = lY & 0x80_00_00_00;

  lX4 = lX & 0x40_00_00_00;

  lY4 = lY & 0x40_00_00_00;

  lResult = (lX & 0x3f_ff_ff_ff) + (lY & 0x3f_ff_ff_ff);

  if (lX4 & lY4) {
    return lResult ^ 0x80_00_00_00 ^ lX8 ^ lY8;
  }

  if (lX4 | lY4) {
    if (lResult & 0x40_00_00_00) {
      return lResult ^ 0xc0_00_00_00 ^ lX8 ^ lY8;
    }
    return lResult ^ 0x40_00_00_00 ^ lX8 ^ lY8;
  }
  return lResult ^ lX8 ^ lY8;
};

const F = (x: number, y: number, z: number) => {
  return (x & y) | (~x & z);
};

const G = (x: number, y: number, z: number) => {
  return (x & z) | (y & ~z);
};

const H = (x: number, y: number, z: number) => {
  return x ^ y ^ z;
};

const I = (x: number, y: number, z: number) => {
  return y ^ (x | ~z);
};

const FF = (a: number, b: number, c: number, d: number, x: any, s: number, ac: number) => {
  a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));

  return AddUnsigned(RotateLeft(a, s), b);
};

const GG = (a: number, b: number, c: number, d: number, x: any, s: number, ac: number) => {
  a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));

  return AddUnsigned(RotateLeft(a, s), b);
};

const HH = (a: number, b: number, c: number, d: number, x: any, s: number, ac: number) => {
  a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));

  return AddUnsigned(RotateLeft(a, s), b);
};

const II = (a: number, b: number, c: number, d: number, x: any, s: number, ac: number) => {
  a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));

  return AddUnsigned(RotateLeft(a, s), b);
};

const ConvertToWordArray = (str: string) => {
  let lWordCount: number;

  const lMessageLength = str.length;

  const lNumberOfWords_temp1 = lMessageLength + 8;

  const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;

  const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;

  const lWordArray: number[] = new Array(lNumberOfWords - 1);

  let lBytePosition = 0;

  let lByteCount = 0;

  while (lByteCount < lMessageLength) {
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;

    lBytePosition = (lByteCount % 4) * 8;

    // @ts-expect-error
    lWordArray[lWordCount] = lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition);

    lByteCount++;
  }

  lWordCount = (lByteCount - (lByteCount % 4)) / 4;

  lBytePosition = (lByteCount % 4) * 8;

  // @ts-expect-error
  lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);

  lWordArray[lNumberOfWords - 2] = lMessageLength << 3;

  lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;

  return lWordArray;
};

const WordToHex = (lValue: number) => {
  let WordToHexValue = '';

  let WordToHexValue_temp = '';

  let lByte: number;

  let lCount: number;

  for (lCount = 0; lCount <= 3; lCount++) {
    lByte = (lValue >>> (lCount * 8)) & 255;

    WordToHexValue_temp = `0${lByte.toString(16)}`;

    WordToHexValue += WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
  }

  return WordToHexValue;
};

const Utf8Encode = (str: string) => {
  str = str.replace(/\r\n/g, '\n');

  let utftext = '';

  for (let n = 0; n < str.length; n++) {
    const c = str.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode((c >> 6) | 192);

      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);

      utftext += String.fromCharCode(((c >> 6) & 63) | 128);

      utftext += String.fromCharCode((c & 63) | 128);
    }
  }

  return utftext;
};

let x: number[];

let k: number;
let AA: number;
let BB: number;
let CC: number;
let DD: number;
let a: number;
let b: number;
let c: number;
let d: number;

const S11 = 7;
const S12 = 12;
const S13 = 17;
const S14 = 22;

const S21 = 5;
const S22 = 9;
const S23 = 14;
const S24 = 20;

const S31 = 4;
const S32 = 11;
const S33 = 16;
const S34 = 23;

const S41 = 6;
const S42 = 10;
const S43 = 15;
const S44 = 21;

a = 0x67_45_23_01;

b = 0xef_cd_ab_89;

c = 0x98_ba_dc_fe;

d = 0x10_32_54_76;

export const md5 = (inputParameter: string) => {
  inputParameter = Utf8Encode(inputParameter);

  x = ConvertToWordArray(inputParameter);

  const length = x.length;

  for (k = 0; k < length; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;

    a = FF(a, b, c, d, x[k + 0], S11, 0xd7_6a_a4_78);
    d = FF(d, a, b, c, x[k + 1], S12, 0xe8_c7_b7_56);
    c = FF(c, d, a, b, x[k + 2], S13, 0x24_20_70_db);
    b = FF(b, c, d, a, x[k + 3], S14, 0xc1_bd_ce_ee);
    a = FF(a, b, c, d, x[k + 4], S11, 0xf5_7c_0f_af);
    d = FF(d, a, b, c, x[k + 5], S12, 0x47_87_c6_2a);
    c = FF(c, d, a, b, x[k + 6], S13, 0xa8_30_46_13);
    b = FF(b, c, d, a, x[k + 7], S14, 0xfd_46_95_01);
    a = FF(a, b, c, d, x[k + 8], S11, 0x69_80_98_d8);
    d = FF(d, a, b, c, x[k + 9], S12, 0x8b_44_f7_af);
    c = FF(c, d, a, b, x[k + 10], S13, 0xff_ff_5b_b1);
    b = FF(b, c, d, a, x[k + 11], S14, 0x89_5c_d7_be);
    a = FF(a, b, c, d, x[k + 12], S11, 0x6b_90_11_22);
    d = FF(d, a, b, c, x[k + 13], S12, 0xfd_98_71_93);
    c = FF(c, d, a, b, x[k + 14], S13, 0xa6_79_43_8e);
    b = FF(b, c, d, a, x[k + 15], S14, 0x49_b4_08_21);
    a = GG(a, b, c, d, x[k + 1], S21, 0xf6_1e_25_62);
    d = GG(d, a, b, c, x[k + 6], S22, 0xc0_40_b3_40);
    c = GG(c, d, a, b, x[k + 11], S23, 0x26_5e_5a_51);
    b = GG(b, c, d, a, x[k + 0], S24, 0xe9_b6_c7_aa);
    a = GG(a, b, c, d, x[k + 5], S21, 0xd6_2f_10_5d);
    d = GG(d, a, b, c, x[k + 10], S22, 0x2_44_14_53);
    c = GG(c, d, a, b, x[k + 15], S23, 0xd8_a1_e6_81);
    b = GG(b, c, d, a, x[k + 4], S24, 0xe7_d3_fb_c8);
    a = GG(a, b, c, d, x[k + 9], S21, 0x21_e1_cd_e6);
    d = GG(d, a, b, c, x[k + 14], S22, 0xc3_37_07_d6);
    c = GG(c, d, a, b, x[k + 3], S23, 0xf4_d5_0d_87);
    b = GG(b, c, d, a, x[k + 8], S24, 0x45_5a_14_ed);
    a = GG(a, b, c, d, x[k + 13], S21, 0xa9_e3_e9_05);
    d = GG(d, a, b, c, x[k + 2], S22, 0xfc_ef_a3_f8);
    c = GG(c, d, a, b, x[k + 7], S23, 0x67_6f_02_d9);
    b = GG(b, c, d, a, x[k + 12], S24, 0x8d_2a_4c_8a);
    a = HH(a, b, c, d, x[k + 5], S31, 0xff_fa_39_42);
    d = HH(d, a, b, c, x[k + 8], S32, 0x87_71_f6_81);
    c = HH(c, d, a, b, x[k + 11], S33, 0x6d_9d_61_22);
    b = HH(b, c, d, a, x[k + 14], S34, 0xfd_e5_38_0c);
    a = HH(a, b, c, d, x[k + 1], S31, 0xa4_be_ea_44);
    d = HH(d, a, b, c, x[k + 4], S32, 0x4b_de_cf_a9);
    c = HH(c, d, a, b, x[k + 7], S33, 0xf6_bb_4b_60);
    b = HH(b, c, d, a, x[k + 10], S34, 0xbe_bf_bc_70);
    a = HH(a, b, c, d, x[k + 13], S31, 0x28_9b_7e_c6);
    d = HH(d, a, b, c, x[k + 0], S32, 0xea_a1_27_fa);
    c = HH(c, d, a, b, x[k + 3], S33, 0xd4_ef_30_85);
    b = HH(b, c, d, a, x[k + 6], S34, 0x4_88_1d_05);
    a = HH(a, b, c, d, x[k + 9], S31, 0xd9_d4_d0_39);
    d = HH(d, a, b, c, x[k + 12], S32, 0xe6_db_99_e5);
    c = HH(c, d, a, b, x[k + 15], S33, 0x1f_a2_7c_f8);
    b = HH(b, c, d, a, x[k + 2], S34, 0xc4_ac_56_65);
    a = II(a, b, c, d, x[k + 0], S41, 0xf4_29_22_44);
    d = II(d, a, b, c, x[k + 7], S42, 0x43_2a_ff_97);
    c = II(c, d, a, b, x[k + 14], S43, 0xab_94_23_a7);
    b = II(b, c, d, a, x[k + 5], S44, 0xfc_93_a0_39);
    a = II(a, b, c, d, x[k + 12], S41, 0x65_5b_59_c3);
    d = II(d, a, b, c, x[k + 3], S42, 0x8f_0c_cc_92);
    c = II(c, d, a, b, x[k + 10], S43, 0xff_ef_f4_7d);
    b = II(b, c, d, a, x[k + 1], S44, 0x85_84_5d_d1);
    a = II(a, b, c, d, x[k + 8], S41, 0x6f_a8_7e_4f);
    d = II(d, a, b, c, x[k + 15], S42, 0xfe_2c_e6_e0);
    c = II(c, d, a, b, x[k + 6], S43, 0xa3_01_43_14);
    b = II(b, c, d, a, x[k + 13], S44, 0x4e_08_11_a1);
    a = II(a, b, c, d, x[k + 4], S41, 0xf7_53_7e_82);
    d = II(d, a, b, c, x[k + 11], S42, 0xbd_3a_f2_35);
    c = II(c, d, a, b, x[k + 2], S43, 0x2a_d7_d2_bb);
    b = II(b, c, d, a, x[k + 9], S44, 0xeb_86_d3_91);

    a = AddUnsigned(a, AA);
    b = AddUnsigned(b, BB);
    c = AddUnsigned(c, CC);
    d = AddUnsigned(d, DD);
  }

  const temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

  return temp.toLowerCase();
};
