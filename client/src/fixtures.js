import * as _ from 'lodash/fp';
import React from 'react';

const fixtures = {
  paragraphs: _.map(x => (<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>), Array(8).fill(0)),
  listData: [
    {
      "title": "Apple MacBook Air 11.6\" 11  i5  1.6Ghz 4GB 128GB AppleCare",
      "price": "750",
      "cityName": "los altos",
      "imageUrls": [
        "https://images.craigslist.org/00l0l_dZkW9tcn1af_600x450.jpg",
        "https://images.craigslist.org/00s0s_7OYZSLh9Uxf_600x450.jpg",
        "https://images.craigslist.org/00909_kxgrKusHVvY_600x450.jpg",
        "https://images.craigslist.org/00Q0Q_9PrdRg7eMZY_600x450.jpg",
        "https://images.craigslist.org/00707_iscddNdTefa_600x450.jpg",
        "https://images.craigslist.org/00f0f_bBJgsAs1ky6_600x450.jpg",
        "https://images.craigslist.org/00Z0Z_D9Mmt0wEOP_600x450.jpg"
      ]
    },
    {
      "title": "Mint Late 2012 Macbook Pro 13\" Retina with i5 2.5ghz/8gb/256gb/IG",
      "price": "899",
      "cityName": "fremont / union city / newark",
      "imageUrls": [
        "https://images.craigslist.org/00M0M_447P85WFLJ4_600x450.jpg",
        "https://images.craigslist.org/00L0L_gtozzFokXHn_600x450.jpg",
        "https://images.craigslist.org/01616_gQ1PJpxnAlt_600x450.jpg",
        "https://images.craigslist.org/00U0U_6IzEdx2uLmR_600x450.jpg",
        "https://images.craigslist.org/00D0D_flUV7wVbjPD_600x450.jpg",
        "https://images.craigslist.org/00u0u_62BOx3P2X0o_600x450.jpg"
      ]
    },
    {
      "title": "Mint Late 2012 Macbook Pro 13\" Retina with i5 2.5ghz/8gb/256gb/IG",
      "price": "899",
      "cityName": "fremont / union city / newark",
      "imageUrls": [
        "https://images.craigslist.org/00M0M_447P85WFLJ4_600x450.jpg",
        "https://images.craigslist.org/00L0L_gtozzFokXHn_600x450.jpg",
        "https://images.craigslist.org/01616_gQ1PJpxnAlt_600x450.jpg",
        "https://images.craigslist.org/00U0U_6IzEdx2uLmR_600x450.jpg",
        "https://images.craigslist.org/00D0D_flUV7wVbjPD_600x450.jpg",
        "https://images.craigslist.org/00u0u_62BOx3P2X0o_600x450.jpg"
      ]
    },
    {
      "title": "2012 macbook pro 13''  i5 2.5ghz 8gb ram 500hd + ms office",
      "price": "450",
      "cityName": "palo alto",
      "imageUrls": [
        "https://images.craigslist.org/00o0o_dECp8z5dwPO_600x450.jpg",
        "https://images.craigslist.org/00808_i5BIdeJJtQx_600x450.jpg",
        "https://images.craigslist.org/00F0F_93czIH0Bue9_600x450.jpg",
        "https://images.craigslist.org/00z0z_3m6I7o1a0CL_600x450.jpg",
        "https://images.craigslist.org/00B0B_7DuZZErjbny_600x450.jpg",
        "https://images.craigslist.org/01010_cfGbhdyPi3w_600x450.jpg",
        "https://images.craigslist.org/00w0w_jaran9My2Xh_600x450.jpg"
      ]
    },
    {
      "title": "15'' macbook pro i5 8gb ram 500hd OSX Sierra + ms office final cut pro",
      "price": "450",
      "cityName": "san mateo",
      "imageUrls": [
        "https://images.craigslist.org/00E0E_8zrkPEZU0Zu_600x450.jpg",
        "https://images.craigslist.org/00i0i_ginfC8K7XuO_600x450.jpg",
        "https://images.craigslist.org/00707_iscddNdTefa_600x450.jpg",
        "https://images.craigslist.org/00Z0Z_bp7R7oEIjV4_600x450.jpg",
        "https://images.craigslist.org/00K0K_dNCtkJQIIFe_600x450.jpg"
      ]
    },
    {
      "title": "11'' macbook air i5 1.6ghz 4gb ram 128ssd macos sierra cut final pro",
      "price": "400",
      "cityName": "mountain view",
      "imageUrls": [
        "https://images.craigslist.org/00Z0Z_5DXfST19SzQ_600x450.jpg",
        "https://images.craigslist.org/00606_gU8XrIxPKih_600x450.jpg",
        "https://images.craigslist.org/00t0t_1g5xhVArBP8_600x450.jpg",
        "https://images.craigslist.org/00U0U_h2B2hL1rGgc_600x450.jpg",
        "https://images.craigslist.org/00V0V_hOaRuxp1Oxt_600x450.jpg"
      ]
    }
  ],

}

export default fixtures;