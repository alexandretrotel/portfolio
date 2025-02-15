import { Books } from "@/types/about/books";

export const INITIAL_NUMBER_OF_BOOKS: number = 2;
export const BOOKS_TO_SHOW: number = 2;

export const books: Books = [
  {
    title: "De l'assurance maladie au partenaire bien être",
    author: "Jean-Charles Samuelian-Werve",
    description:
      "The current state of the health system and how it can be improved.",
    tags: ["Health"],
    url: "https://www.amazon.com/lassurance-maladie-partenaire-bien-%25C3%25AAtre-optimiste/dp/2381582525?crid=FTLE0AVJE6JC&dib=eyJ2IjoiMSJ9.cIz9S97-0koKIjVSB1vzYQ.iPzpvuDrqovIc-f8cezyu3CQr0qeVI3QWlpK4BVoKBk&dib_tag=se&keywords=de+l'assurance+maladie+au+partenaire+bien+%C3%AAtre&qid=1735504438&sprefix=de+l'assurance+maladie+au+partenaire+bien+%C3%AAt,aps,290&sr=8-1",
  },
  {
    title: "Devenir rentier immobilier en partant de rien",
    author: "Christopher Wangen",
    description:
      "Become a real estate investor with no money down. Also explains all the steps to take to get there.",
    tags: ["Real estate", "Investing"],
    url: "https://www.amazon.com/Devenir-rentier-immobilier-partant-rien-ebook/dp/B0B35YGPMM?dib=eyJ2IjoiMSJ9.FDg7Wl7WQmU5yuT_khLxBMuzqg74mnvX__w6Iy6lgGig_p3TkeS6guOTje6jM5SrudVGG_gaTvMsNJ5JuaL7nxLeAoUmUXwTsQIag-ZPcUw.h9VlZTIHeL2T-YRMme-yA8s-0agYCl2T6gPva5bc1GI&dib_tag=se&keywords=devenir+rentier+immobilier+en+partant+de+rien&qid=1735504766&sr=8-1",
  },
  {
    title: "Deviens un aimant social",
    author: "Charlie Haid",
    description: "How to become more social and improve your social skills.",
    tags: ["Social", "Personal development"],
    url: "https://www.amazon.com/Devenir-rentier-immobilier-partant-rien-ebook/dp/B0B35YGPMM?crid=38CM7OBHR7SA6&dib=eyJ2IjoiMSJ9.FDg7Wl7WQmU5yuT_khLxBFA_7Ob9hnnob33lqhCmOp8kWmgg_vxZLct7E_noDZuyt93SgIUpbBmNi9fL43rIUS_VbX4qbroTBsDnLnX_PUBQeeJaHniKjquyk3wzN6S0.aFZ6AnTwo0ooVTnVI4LxF65PuVhxLtIsgNtHqrB6hWE&dib_tag=se&keywords=devenir+immobilier+en+partant+de+rien&qid=1735504861&sprefix=devenir+immobilier+en+partant+de+rie,aps,344&sr=8-1",
  },
  {
    title: "Digital Minimalism",
    author: "Cal Newport",
    description:
      "How to reduce the time spent on digital devices and social media.",
    tags: ["Personal development"],
    url: "https://www.amazon.fr/Digital-Minimalism-Living-Technology-English-ebook/dp/B07D1G6DTF/ref=sr_1_1?crid=10W29BRIWKWF7&dib=eyJ2IjoiMSJ9.ZLNOg8VYnDaDStn3UT7Yieu8oDXCt29VlTvZf4cUQ-sZLhW3Iu6mleaj7PkrPSepFQX7bkMQP4JmAor4MPUqrtkMJ3mzhffFDsMvRY_3aV3z534Mu4VfZLwVwU9twjAx7s0vSGq10MOmiPVU6a0xz743HnbYEJJ7TboAKWn1Gfe5ealXAPPBBq6uONQYI0BfE_JYvDUoHGR1udxAqBS5ALK2YbW12R9H40hXxtgvYyOYJZIlrLM0i2K5SAFN7gsCpJ25q4XxWn2EWbYzjoAB1fAkl6H5VL2Kp3KYmHmwSQV3SQMHzn6M-cp2gHnQgzSVUrVMkEVHG7AXSK_BNku_9B1zLOenk7eK1TkD3Vchb605WZ-Epez01UKXpc3Nk8qDhk9SJ-bUdvLT-7mYJGHcW0kk3ufw6K8xtepU47PA8zQJGG4FN1K1tKhfq3UZzIJ0.T6XR4TB64AOaW7GBdG-w2XRm459SVKobShreR14BLgk&dib_tag=se&keywords=digital+minimalism+cal+newport&nsdOptOutParam=true&qid=1735590716&sprefix=digital+mini%2Caps%2C212&sr=8-1",
  },
  {
    title:
      "Elon Musk - Tesla, PayPal, SpaceX : the entrepreneur who will change the world",
    author: "Ashlee Vance",
    description:
      "The biography of Elon Musk, the founder of Tesla, SpaceX, and PayPal.",
    tags: ["Business"],
    url: "https://www.amazon.fr/Elon-Musk-lentrepreneur-changer-enrichie/dp/2212567863/ref=sr_1_6?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=23EC3HDTRSFKH&dib=eyJ2IjoiMSJ9.cBMRWJHYLQEIDx-jC2lQHMqnniaQ3ekrzWZP3ebjniJzx5vffpPsjynLhzecCbDfTxf8TezKjKwMJkO4PEnHz3ZUygbTWGtz-dVCHnaGJuamo_o3mzbcF6cvH4CpsX_RHp_0732s3LpAqR5Quy3D_Fn2jTAOZnS3BlVNzof63Ke3DODqBgjkfpnGtzviYANI2h2BQpcdSV4wlcytG7rgfsUJ91MP8DoH4i9PGiBHfIChj9aboD8RfFWdWEylBxBZR4B9dNcXWKd-YSsZLCYSDWPWmaFN-0RHvehTvRw1dYQpda_Su5RF27TWF04S6KFMA6dowWa809UTNHDNbl5pgLFblVtxc6jEouq1A5v1MM_97TKlR25n3rPHHN4DCrXkVmwpD1pO3nztJOgoG2IZ26YVQ87iYyk9ZD5fLvABM6CUYTfHnbBvmKTfT_6rdjp2.dD9mSY90GJBOrjl0QiCZ53rgH2PxCa_VWVLpLFwWvVk&dib_tag=se&keywords=elon+musk&nsdOptOutParam=true&qid=1735590782&sprefix=elon+mus%2Caps%2C115&sr=8-6",
  },
  {
    title: "Healthy Business",
    author: "Jean-Charles Samuelian-Werve",
    description:
      "The culture of Alan, a French health insurance company, and how it can be applied to other companies.",
    tags: ["Business", "Health"],
    url: "https://www.amazon.fr/Healthy-Business-dentreprise-Excellence-STO-ESSAIS-DOCU-ebook/dp/B08DG6N1WM/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=SVFEXCGU3FPC&dib=eyJ2IjoiMSJ9.h1PQwR7aOJBgS7U5Rquk3Ee8aV1DWzssTRsPNcc9cpJbeG2AyhGQ5-ZqbpZ8N8yJtkZz48u6ZOT1fLA1U8LBchz-pzNZb5LQcamLAzYLiseYYJtDqaUqv4vIuYbU9xBQCRttDe0kTetTbzI03rQJshaDP-TQqDIBZmpshZUHgJnkxX9rmjjX-uAuAW0IX_VIm97H0WZyolcVR2xL92qNTgaNrcuimZoz30WNgy6jnI-x2bw1Q2P3xajqC471UuV0sQOCbrKkkri1_UcWada7QNchnyITZLCjmyYuNCvbiifliokIqKGRHeEN1Vl5XWanVwqAjmpiFBDZ9unTK2cmEEYzQhi_ZJUPAqTp4StMkLgX0KIcRKW20gQ-MpFoqPtGjS0_xjVR-EwSOeE3tOX39IhtNUqFYbAzmegVK_Bch1w7lcPYimmoddk7br93Ap5g.Qdq3IbPHFj6Kl9lw5GJCC7sPX3ZFLCvxxsNMqG34t4s&dib_tag=se&keywords=healthy+business&nsdOptOutParam=true&qid=1735590835&sprefix=healthy+busines%2Caps%2C107&sr=8-1",
  },
  {
    title: "Influence et manipulation",
    author: "Robert Cialdini",
    description: "How to influence and manipulate people in a positive way.",
    tags: ["Psychology"],
    url: "https://www.amazon.fr/Influence-persuasion-3e-%C3%A9dition-augment%C3%A9e/dp/2266326112/ref=sr_1_1?crid=2FTJ877HOJG88&dib=eyJ2IjoiMSJ9.qhM3NjINUXc4RxILrQ28bCZNJuxa_54oYmcc3E3kSEU1tbGKOb2gH-iOt5cQTV1VkQmuaXvdwuoIjhmRI5DcBE5GEIkWnRXA97-upik_siAb0zCoMW6SxUQMZnDSO-YO-03bBx7m-HQooJtXAts3ApzB6fnHcWbmYB5MHSY7cSN5U2P7CNyLXP6xNXKz1TwViwVL9GvDMvTHX515KtuLZCAVQmRGBCCADdpl0M4qq49djbSiLwqfCePnuYFIKQtnnDN8XChjr_dS_kUfQR9c7zYHlhL9RFQYo1NV357cwpPHIpvu7noMBqTHkp_adUJwY9Wrenrs80QpiqCgD2SGjRgpcHFpJHm1EIecSgthSxFL8pLxbc7MvSb6zlWzTJ3sEki3QgeszU_4ESlXz00U3dIvhBkBIE2bwaWNmblifS_0TofM2ijKS3lTPw3u8HV-.0PQPNFusYJZaW8JbCe4Y4GGoTZVLJOFi9ioPcj1N9v4&dib_tag=se&keywords=influence+et+manipulation&nsdOptOutParam=true&qid=1735590869&sprefix=influence%2Caps%2C118&sr=8-1",
  },
  {
    title: "The 100M Offer",
    author: "Alex Hormozi",
    description:
      "How to build a business that can generate $100 million in revenue.",
    tags: ["Business"],
    url: "https://www.amazon.fr/LOffre-100M-tellement-irr%C3%A9sistibles-Acquisition-com-ebook/dp/B0CTFYGMBT/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=DZZ9SLO4RL8Y&dib=eyJ2IjoiMSJ9.xxZ1xU_m9eUJkWmbFZFntJsc2uEp3zIMWDy0O9J2GDRZKAONYUpN3xIUoIXHwL0suwrebFVIz5alYPotakQ6JRrPAOKiVPH8-g3RV_JxgUZn6JdaXT2cx4-8hVGBGeNRwGSADdkbL29CfJcSoAn_RQeZqAcDe3AO8wSyfn1doy1kRUNkguaNsKm78vLUTbifGXMjMqa9cGZi4k8YokoBdnhJsDi0mJt_Z55pBhxH7wHxf9DQ4vJua0D5onQG_R5ofJD_jkgWMp7gd26OrnFUaCeb3JAu9495hDeBs1KamHU2FIyP3II6W2nYZhjMG4_1IyehT6h8ACJAzkyuSUNG9HiC3D4AKvB0dFeGxfvQUIRbpDdEanZ89wlW6VMQkb0YDC4vYMXIJbOYuRo8es7jn8-GSXkOZNbZB32siaoWKRz8RT-qN9pwc9wp4VK-X7VP.nYVwCbNcv309rGMl20J4SlSNZHzsR5XtfQq2ShFvzYo&dib_tag=se&keywords=alex+hormozi&nsdOptOutParam=true&qid=1735590933&sprefix=alex+hormozi%2Caps%2C143&sr=8-1",
  },
  {
    title: "Rich Dad, Poor Dad",
    author: "Robert Kiyosaki",
    description:
      "The difference between the way rich people and poor people think.",
    tags: ["Finance", "Personal development"],
    url: "https://www.amazon.fr/P%C3%A8re-riche-p%C3%A8re-pauvre-anniversaire-ebook/dp/B088KV95TK/ref=sr_1_1?crid=3TCF321FHSEBI&dib=eyJ2IjoiMSJ9.6JRI5JnJ_m62fWkiLwaZnK4_l4y21R00j1YkxJHu9MRQiI1Dcit9Ulxynq9n4wIi98ygMC9d64U_sJkmiSCt7AghCNBJf2t1_YH1WXwBpBpvrdIDDFiwKZg62jqXuW3Oy80h4d3q3k12fC3DmlvHJof9gGtmsqwRmI3qtM23UoLOensX_hYS3XmCaq4THlnHDAJZ6lqaGlZOLhBK1J2540wtpEeEk5wuri67olAxNLqlyqU6UNF8NirZTG0a_PXwOHSoXbaVUwU5c88SmmnRHZoI0ZxBgiKfOlOVIOGKPMx0lE01sBrwZlP8QeKRvfokV6tvYAovh07sNA93xZhqtYkj7vimZurdUggV3-waBCTInBjr8Fzk-5ZhUUNwvg2PGZZ8_wBe8HCvP9QusZCEDQ.1sSMtNo18rm2ojfh4CqGFsQ0F4xwsZ_BSToeCRpAKRM&dib_tag=se&keywords=p%C3%A8re+riche+p%C3%A8re+pauvre&nsdOptOutParam=true&qid=1735590978&sprefix=p%C3%A8re+riche+p%2Caps%2C127&sr=8-1",
  },
  {
    title: "Token Titans",
    author: "Tugan Bara",
    description:
      "The secret playbook for building new web3 experiences, NFT communities, and DeFi protocols.",
    tags: ["Business"],
    url: "https://www.amazon.fr/Token-Titans-Experiences-Communities-Protocols/dp/B0CNY7KZXT/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3HGDUBBKQOZM7&dib=eyJ2IjoiMSJ9.TBnEBHhuE4-BWHWFCLJhMmBtmitl8O0VIyt5mYzAp_kaK3SmXnGVCh0NJfBsq8VZ6PTxKiwVAJWprgTgVIVykuNKXgrpWifyaj_RiyI_xmgRsTECLGEIXVD9J9limyph.7Dd1rCaVDWEhhfY24L0WH-xGPjB3zLB627F6Qh09Ch0&dib_tag=se&keywords=token+titans&nsdOptOutParam=true&qid=1735591041&sprefix=token+titan%2Caps%2C120&sr=8-1",
  },
  {
    title: "Votre attention est votre superpouvoir",
    author: "Fabien Olicard",
    description:
      "How to improve your attention and focus on what is important.",
    tags: ["Personal development"],
    url: "https://www.amazon.fr/Votre-attention-est-votre-superpouvoir-ebook/dp/B0D1SPB57T/ref=sr_1_1?crid=3SHDMFHD8H7G9&dib=eyJ2IjoiMSJ9.YVHpZXAyOnwhub1N-1Fz5ZcAeikvFxHuUQVd1qqSKNEE2pXRatM2xURdWc_gkLJxNrpsUx229U3ayiP9wkuJK6bM3NpUCXENCQFrrk0x0LLbF6qtvyXVDcekAocAAPpGS2jFsQcAEh5DSkwgMESP_A.inB6AfCItvw-Z0YdUJGJIV16voTOoILn6skn7BNo49s&dib_tag=se&keywords=votre+attention+est+votre+super+pouvoir&nsdOptOutParam=true&qid=1735591181&sprefix=votre+att%2Caps%2C124&sr=8-1",
  },
  {
    title: "$100M Leads",
    author: "Alex Hormozi",
    description: "How to generate leads for your business and convert them.",
    tags: ["Business"],
    url: "https://www.amazon.fr/100M-Leads-Comment-inconnus-Acquisition-com-ebook/dp/B0CWF5HC2Z/ref=sr_1_2?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=38WGBMKO974EA&dib=eyJ2IjoiMSJ9.xxZ1xU_m9eUJkWmbFZFntJsc2uEp3zIMWDy0O9J2GDRZKAONYUpN3xIUoIXHwL0suwrebFVIz5alYPotakQ6JRrPAOKiVPH8-g3RV_JxgUZn6JdaXT2cx4-8hVGBGeNRwGSADdkbL29CfJcSoAn_RQeZqAcDe3AO8wSyfn1doy1kRUNkguaNsKm78vLUTbifGXMjMqa9cGZi4k8YokoBdnhJsDi0mJt_Z55pBhxH7wHxf9DQ4vJua0D5onQG_R5ofJD_jkgWMp7gd26OrnFUaCeb3JAu9495hDeBs1KamHU2FIyP3II6W2nYZhjMG4_1IyehT6h8ACJAzkyuSUNG9HiC3D4AKvB0dFeGxfvQUIRbpDdEanZ89wlW6VMQkb0YDC4vYMXIJbOYuRo8es7jn8-GSXkOZNbZB32siaoWKRz8RT-qN9pwc9wp4VK-X7VP.nYVwCbNcv309rGMl20J4SlSNZHzsR5XtfQq2ShFvzYo&dib_tag=se&keywords=alex+hormozi&nsdOptOutParam=true&qid=1735591241&sprefix=alex+hormozi%2Caps%2C111&sr=8-2",
  },
  {
    title: "Votre temps est infini",
    author: "Fabien Olicard",
    description: "How to manage your time and be more productive.",
    tags: ["Personal development"],
    url: "https://www.amazon.fr/Votre-temps-est-infini-journ%C3%A9e-ebook/dp/B07YBMPNFY/?_encoding=UTF8&pd_rd_w=XygSs&content-id=amzn1.sym.0f397839-e4a6-4db5-bb45-2a80947b193a&pf_rd_p=0f397839-e4a6-4db5-bb45-2a80947b193a&pf_rd_r=XXZ7QV5VBVFPPD2CHKFF&pd_rd_wg=1HHJp&pd_rd_r=2d94e1b6-be71-4208-b597-441f8ed3411e&ref_=pd_hp_d_btf_ddex-mdi-hpd",
  },
  {
    title: "Émile ou de l'éducation",
    author: "Jean-Jacques Rousseau",
    description:
      "The educational philosophy of Jean-Jacques Rousseau, a French philosopher.",
    tags: ["Personal development"],
    url: "https://www.amazon.fr/Emile-ou-l%C3%A9ducation-Jean-Jacques-Rousseau/dp/2081206927/ref=sr_1_1?crid=4LKXIXIRE35F&dib=eyJ2IjoiMSJ9.hFuQnoeOmaxwZb0GPSfefTkckTIWZq4TxNEuUYNHT_xBxlh-Q6xagJf_HU9aBLoJlpf2ypBbI8IjKHHUGoo_AMNa8K6lg5eg6tvnSWvCyi9BTtj6WRwe0dGz8_jiATICfSKmvPjNyOd5_rKBkTm7XGPJ4chRjD5rG0qxnNt4qH0TrPVG7r2YcrBCOkzYz7p50btWzGcbkfDLK3EoRrHuqZoZf4QJHMbQ8A6ZF9Qj72CIn76hXCfVAIACmnvlRz1dy7t__CPSPbIldfiRJqZ53GWtxFVUFRSRU4kIHX8CUqQ.jzSnMJAaykdDIWkK9wM9-uelhvh90r7BtnlIVikwrqQ&dib_tag=se&keywords=emile+ou+de+l+%C3%A9ducation&nsdOptOutParam=true&qid=1735592264&sprefix=emile+ou+de+l%27%2Caps%2C121&sr=8-1",
  },
  {
    title: "L'étranger",
    author: "Albert Camus",
    description:
      "The story of a man who is indifferent to the world around him and the events that lead to his ultimate demise.",
    tags: ["Philosophy"],
    url: "https://www.amazon.fr/L%C3%A9tranger-Albert-Camus/dp/2070360024/ref=sr_1_1?crid=3R1Z5Y5Z5Z5Z&keywords=l%27%C3%A9tranger+albert+camus&qid=1735592264&sprefix=l%27%C3%A9tranger%2Caps%2C121&sr=8-1",
  },
  {
    title:
      "21 Lessons: What I’ve Learned From Falling Down the Bitcoin Rabbit Hole",
    author: "Gigi",
    description:
      "An exploration of the questions and lessons learned from studying Bitcoin. Gigi, the author, shares his personal journey and the knowledge he has gained over the years.",
    tags: ["Finance"],
    url: "https://www.amazon.fr/-/en/dp/B09MYXXS2X/ref=sr_1_fkmr0_1?crid=3NYFN516KHHXM&dib=eyJ2IjoiMSJ9.TGUWRKKDLW55QyXMG5CdFQu747IMyHVPrP4TDU_iE9cN7VUuNqq2L0YmRpvO9c6GPAQm6x8A1FE86dqCNOJDtNku5UDKbJUTpZ1sZFsC3PE.riwIQfwk5dGUQKEWIqWWQQeqygpOyIMYaxohUPUBykk&dib_tag=se&keywords=21+lessons+on+bitcoin&nsdOptOutParam=true&qid=1736274685&sprefix=21+lessons+on+bitcoin%2Caps%2C82&sr=8-1-fkmr0",
  },
  {
    title: "Investir pour être libre",
    author: "Mounir Laggoune",
    description:
      "Mounir Laggoune offers a step-by-step method, based on proven concepts, for building wealth. From budget management to real estate, alternative investments and your first shares on the stock market, he gives you the keys to an automatic wealth creation system: your money will work for you.",
    tags: ["Finance"],
    url: "https://www.amazon.fr/-/en/dp/B0DJTSFLVD/ref=sr_1_1?crid=1DYG8X4K99VF3&dib=eyJ2IjoiMSJ9.dOwmNyVy5kjdTUKmBHUTxRMFxo6L2nxjmvJNF5ZazXrHYCQHaULSDDLXD2BDCwPVAAVubU3FOBNZoVULrQGfIX36lr4f_w_LcYbdwUNmGp2cZjNxdBz0sZGlHYf8alkijHt3QhhDgJ4q4-ZVpE6wJ39vI13I-03RK9cURF0jI_rxZoB9kZkedZJ35MW_wFhlO5V4BSUhafWtMYKdoykDJjnrb_E-YoPeVoW9VNZCBJ5-ZJO3KIhq1IqbiC1Lve0YXgTpvfoiJhXiD9ZXA_3YJDta-7XupaBY-k25UlLDMyUuUDjgISj8HTMIA0lOmf-nYKD0c9GQxKyBLCQjKGfkhEUKHUejlpjQ-uhbIgwqKpAzX3K1oycqIAqIZQiWGv-e4E0yaVJxhirGvbyXNDgULufirRLdloCppGB9rldH5PC2H38A6yGYVAIpqcJnYAHg.WK9ChF8fb9sUr8vKHrr4RTkcUZPoHRDYPuqHn3QYp-A&dib_tag=se&keywords=finary&qid=1738142516&sprefix=finary%2Caps%2C80&sr=8-1",
  },
  {
    title: "Une sacrée envie de foutre le bordel",
    author: "Xavier Niel",
    description:
      "There aren't many entrepreneurs in France who have made a fortune from scratch. A kid from Créteil who didn't go to school, went to prison and became a billionaire - you can look, there's no one else. It's a conversation between friends about a man, his choices, his regrets, his hopes. It's the story of a success story and the improbable path that led to it.",
    tags: ["Business"],
    url: "https://www.amazon.fr/-/en/dp/2080452142/ref=sr_1_1?crid=2LIMADJ3D8RF3&dib=eyJ2IjoiMSJ9.1yDGMJLdb0TUi4tqZyf0jFQfgviwrmWyChds8lMhFwWftG68nH3qZAbp8aEqySRLojz-2KxOEkSpuHFP3M5Ldc5FMRD6jmTbbC3hyJUYquskRNyD-LhfYncTkACVj2qVMyeKqQuwWs1j4Gyscj_Wz0B-IS9bxwnKt9Y-rPcKLyeTnQac8_otBzUlL1fmcaU8oyjRC3I5ExJNy4EDHChNmUAA-otE9PZcFqPa_Iz-xd9M026UOTEBzTXqFnzOoV7HQcuFStCNaD0MnmFvCiFQgspcwLctWKYnI3NCeCepQE3dqyFGQyiSwb4mYnH4HPpUHtEoQNZnTlaTkm9Yaih8_hT3aTS92Hwn5GgO1iwm7UCA7nToue48oTKt_Iff6AqdWBFV7Ws36y99k3KaJgqRrBPi9-gFuFfFreqD7m5hI-w.3F9NByjEzfQhoh3IIKbgkaaosL1cdhCeJcYcLuo2bpw&dib_tag=se&keywords=xavier+niel&qid=1738142593&sprefix=xavier+niel%2Caps%2C80&sr=8-1",
  },
  {
    title: "Le discours de la méthode",
    author: "René Descartes",
    description:
      "The Discourse on the Method is a philosophical and autobiographical treatise published by René Descartes in 1637. Its full name is Discourse on the Method of Rightly Conducting One's Reason and of Seeking Truth in the Sciences.",
    tags: ["Philosophy"],
    url: "https://www.amazon.fr/-/en/dp/B0B2TP67QP/ref=sr_1_3?crid=79CLVCG7I01M&dib=eyJ2IjoiMSJ9.s69b75TJSjctva3hhyithpLJ8Lvf5ee1IRTY9P65FBkagqyBBm613lpTEGTAMQRO4Pti49ndDc1aXZj_QjAHT72tFxY3f61oBOlWacej_V_kaHMHG2UzAVG0wrQt2spZ77y1oYuVz_kkBRjx3eT4XbKy_DvIG0BpUdDvYY-CPicqko2TUEQ46GZyv6o1ACs9HbqS3FJOJRKhQvcsWo9CTff3NtD5ISa_xgH-rFLEqLIXdKAWV1v2gfEZDbCyW-NSKW2ji1sXnT0IANkVkMfe5MrTlt8VMMazWe2YWSEE-zm_WFTq3s2p-Ozq-jncTc0MpXVkgYMInVLfIpJGRa_zHxoDIOMGDYf1yiLZrQHTbBHRVMT0TbGowr3tSBIMz_0lSf_mzkoXtPTSemPt140HC9z1z-iXptTUL7Km9KFQpH_sQIGtivXGra1yVDC16-uh.easjSltLNO2oyEIuarLJd1wr7X158eH7EJka0ur8KCM&dib_tag=se&keywords=discours+de+la+methode+descartes&qid=1739404127&sprefix=discours+de+la%2Caps%2C82&sr=8-3",
  },
];
