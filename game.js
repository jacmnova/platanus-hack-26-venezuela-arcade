// Escápate del Manguanguas — laberinto de Caracas
// Sprites de pixel art hechos con código. Cada partida genera un mapa distinto.

const W = 800;
const H = 600;
const COLS = 21;
const ROWS = 15;
const TILE = 32;
const OX = (W - COLS * TILE) / 2;
const OY = 78;
const MID_C = 10;
const MID_R = 7;
const STORE = 'manguanguas.scores';
const PX = 1;

const PAL = {
  K: 0x181425,
  Y: 0xf6cc26,
  W: 0xffffff,
  G: 0xa020f0,
  M: 0x00a0ff,
};

const DIRS = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

const BOSS = 'data:image/png;base64,' + 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABdCAYAAAAVIWCbAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAkKklEQVR42t18B1QUZ~e+wWVZdpdlgd2ll4WlSC~SOyrFiohiBcSCYkdQ7AWxYa9gL1Fj7xI1IvZgTDQaNaaYmERTjDH2djzP~77vLitY8vuSL594~nPOPTM7O+~s3Oc+97n3nRlo0OAdWGIiYw0iI+MN2HZ4aJRBTESMgK1DwuMa0LZBg~8fFwuFpdhUZt7RVK6Y1lAgPmYssz3oqvE2DwgKHW1va3NR4+IRY2RkPFBsJA5zUtoIY6MS6gAR36y1fjs8qmmDN31Xe~s~WsIiE94K4prGOYEufukFjp7Ne6sb91mpiZ8Jv9bl11dtqcbG3WeQ2uf9m5aaFo8Ucps7AcYm18Nl5qm1nartWFBQuOBfA+BvD~gbS+PQaANrdXSyfaOWeZr4aRVuSUvgmlgG12aLaL0YnillKJ5~CDv2f46Q9JVwa7YQiVEjscoxGDMsnb7NUlktbae0yQkKiTKofZ1NkzKk7yTN2UUqFVYiM7mF1ERmJt46Ks07qHnpzpBW0+DXfC5cGQA1lliOwNSlOPbJ17j8zXW0yv2A9pdzS4keiX1KDT5UumCTSnOwo5VThMzUXFzD2PT23d1ILwyiY5oZvI4BzNhx~8vgvnYJj4gX2DtoZissrK5b2AT9eHiWy5MFY1JRPr4F2nYZpo0+Oe+WvAyt+25ESIc1iOm8GhkDN+mc14LjnrgIBX4ZqCAQGBAzLO2fe5nKdhobS5yYU81bZcpfTouXA~FX3~~PFqbizhqvcpGxBA5BA7GlWwSu56pwaaUnottO0VM~td8WfH75R2zaexa+rZfpgKkBQMuC0Php2Klyw14CYB3ZSKXjtXylY2JkRKxB81ZZsr+4hvqtImZmyiNK5yS4xE5B2~B89Ajujc5ZI+GavFTrKAGQ3HMDTn12FUs3noZPKx0Ata0GAEstALsoFcrJpinVWx2t7eUejfyEb9Kx4OAI4VuPfO2lYUPBFYeQQuTMaY3Ba6O4ZYzO4bRPyHof4+cd0m2vR1DaCnJ2aV1t0LEgNH4qB4ClAEuFtUpnTFKo7+SrHAtsrOzFLwGgj3poSLy4XgBgP+qh8RAZGDQkAAowOz4Gu0IdMbRdawR3LEZQu1U4d+lH3P7zDsbO+UhL9cQ3mI4BuwiAiloAlCicMEHptNzCTGH+puvw8wsW1kvkrSgqJH7+771ncMWh8SAEJ5Qiqsl0+CaS+pOouSctRs6I7di493MEtF2hTwft+lUQGAN26RjAbA0BMJkAGK9wWk1p9kYAYqLiBfUCgK2dk9DU1GI0AXBbbh0MlaYllK6toXJLhZJtky5YuraEbSP2uTWcI0aRKC7UCWPZC0boRfB1AKgZC+6MUDoNtrSw5L1AdGxLUeu0bGd3tbsoNrqJICY6QRgZk2jwloVPoRAKRWuVTrGPlG5twczeqx3GjZ2AFu3ykJLaGyWTijF69DhYe3aAlUd7yJS+MCWgzOyioA7XgVGrEnAAVNoUYP3AWoWWASwNihRO01SmFvKatjghsZ1BvZU+czOlVCxVrLb1yYJL3HQucEzxvZsvwqDiPUjpuQ4tczfiwpc~Ymp5FdxTlvCoOwT2hZ1~L9j6ZEOm8oWZbThsvOkcsZN5anANIACY8~vJ1iiYCDpxYwAozFWyei13traOAiOhqKO1a3K1vX~P5zKrIMgsAymqjWFK21KKsInSh8yPot4Frfpsgl9qTe5r+wFXXWts3zgfdkGDYG4fA7GZhlKkFULjpmC3jgG7yVboAGAMGKVUT3FzchXVKwCGhsICM5uQZ7Y+OVC5pEMi94TE1AMCgREiHSzRzssJrTyd0N7LEZHuvlCoSQPc0rRUZyCwvoDMjVnKMg6Gc~REzgKR1AZWVo3Q08IKG1WuPP9LdNFnOjBKoZ5mrbKR1eR6vZQ9E4tGFSyySuc2lM+RkCkiYWIRhoYCY+TH+mNL16bYkpmIrZlJmNMmCpkhnmjl7wsLpyaw9etNTi~Xp4u+A6ypDE3mQuXaBhZGRqBJANKVKg7AFHJ+KtlIAkAhV9RvCjh6p5fa+fbmjjMztYzmawbAqMRgHOrbGpUD0lDZvy0qaftQbktszkrCAAKnRaA~pUogOTrnhdMEAAPG1CqApxBLH6GhEczlCkgFhki2MOMAMAaMYBogV8hrruWtqz5bvGMGK+xcYtJEYotPDY3kYCYUmeG99xqiuFUkvirpiR9m9MX303rju6lktD4~Ngun8jtgS48WKGgaDFOFK8~5GjMSK+Blo0RRYigyQ71gIpHByU4NK0s7qMyV0EiliDE3YyJYSr2AngGRUU3efu2Pi09u4OzsLhAbSzwsVXYXrawcntMUeD61wj8v6d4CNxcNwe2yfG73lhXi3soi~L6kEJ8O70wgtMeRQe0wqU0MJrSMJMCiUNw6GiWpMVidnYLTBRk4mNcGMW5qODu6wlntDpXKDiamKoiFIsiNjC7KZHKr2pOwelsCgsIJCC+5o5P7SmtbdRqbCwxJCkdykB+SAv2QEdkYV2YNwIPVI3F~xXD8OaE7tuW1RRM~b8T5eHFr6u+NZmQT2ibgk9GZuDg2k4MwpW0sLEgIXVwawZGYYCZXQmkihZlEDKlU5lbfN3zqLHZ2Lla2ts4RbC4QqXGEp1oDtYMLXBw1SCBnD43IxIPlw~DZqG7IaOxFgugJFwdnONMxznSMl9oFaUHeGNE0BGeGd+JMmdehCeTktJpYoLSwRG58Y5wfn43KoR0xuEVkqbW1w~8phNHxKW9HH1hH5ujoImZzgT6hnhjTry9duAb5g4ciJysHXaICOQO+Ls7B~l4tsK5jAobk9YUDRXbggHyUjBmN+alR2NylCY4PTsdZBkCGFgA7awcEONriAjm~uHUEduSkYGyb6OcqSzsV~+2waEG9A+CssBbaO7q7kQheGZscijNlE+Hp4ophAwfh+K4NmNEkEPeWFuDbSTn4gij+KTGhasEEaOydkNu9J25cPoMT5PQ1Es4rBNK5EV2woGNTmJtZwsPBEYsyErCmfSyWtong1WVMLQD+6qboX4Hz7wJgYSW0c3D3ZSmwqX86rk3vi0~HZuN8cU8cJ8cWEwB3lwwlAHrg6mRyeFY~fFXcA5+N646z43Pw84Ih9H0Bfl80mAvn5XHZWNQlEZZKa~i7OHNWFAS44tjANFylqjKubcxzhdL6lVlhSEhkHYdDQyLfzvRYbe0gsLVztmEA7BjaCTfmDsQ35Ohlou0uqv8H+rTG~VUj8B3tuza1F2fD11QqWUp8RfY1AfPL3AF4RGnyYHkhLo7JxM6+qegZG4QCEtWTVDlGhjTCnKRgXC3t~d287slrHWwcX3EuIjy2DgBhYTFvhwH8hoijht8Q2T4kAw9XDMMjcviHmXmYlRCAPyiy91cU4dq0XHw3pRfuU2l8uKoIj1YO11mR1mjcQwLgOqXCZ8Qclgqfj+yKaqoKi1uGYSnpxOcTe0wj8RS~~sZsnEG9VAH2Q65u3loABnfgiv9wzSisSovGp+N74v6mEu7YHYo8a4y+JiY8rHG6DgjDOQg~lvbBp8M6cTE8O6Iz9pFwzm8RiksTsh8cGd61wMbSVvw6J6N0j9zeOgBscXX3EWoZ0IHX~YerR2B+CgninOG4t3suviSqMwFjNf5YYUf8vngIMWEYB0JrL5jAUocBwOwMHXuCNOCHGXnYkNfupomJ3KO2YxHRzfROhwRHCusNgIDAMAErgzwFKPqsGzxGF74qPQZlbaMxPtKblDwO50d343rwR3kBF7wrE7vzNWMNK5UP6Du2j6XAJwUd0SM6AOdILK+SsJZmt+1trbKu82SI5gL67diohPp9MkR1+1C36EB8WtyLCxtT9ovjsrChYzw+6JRAJTCLO~uQnGWO3qdo~zZ~EC99P5Fe~Eh2c+FgXKaOkdGfRd~TRvXM397qxzgP9cGoqARBx47ZHkGNIwSsBQ4j0fPx9BN5eQcKg4MjBWxi9NbuDDX2DXpFYV003sulYik2D0jnTlUXdcbPc~rhKonf1yWk9AsG47eFQ~DbvAFaI2f3Ud9~aWIOLhA47Lhr03NxiUBjAniEUsbb1mqnqdxcrFBaifiToZaZ8v+ZU5Evichf3gm2sLR6pRyqPVYaG0tRnpmMXxcMwkwqW5NSE7Bn6gjsLBmGHZOG8e1dk4dje3EhihPD8X7nJrizaiS+m9WfaN4HPxAArAyeJfBWd0t67mlrnVP7NxJTusj+ZxT+O4tlLSWuWRwc3cJMpPKiULXdterx3fEl5W1RWhJu~voznj19XMeO7dmGnfldqPkZwkXzLoHw1ZRcngIXSCd2dk9GopvDE4lYqqkjei~V+trfNUtsJ6j5XG9PiGj+rjE0NLq2sX87cmwUKqkqjExNQnGXNEzO6oCSzPYo6ZaOvcOzcIvrQSG3P1gHSN3hL6QJVUT90WGeaOnhCJpmn5VIpDb65iY06o0ABAeGi+odADt7Z4FIJM7rFR3w6OrsAbhbno~vqa5fJYFjn78t7Ytviep~LNX2CkwMr9N3pwszSPyysaNHc5TE+vEeokOgFzL7jIWnb3gBc4gpvpdXgPCdezL08mJt42BgaChcum9oBu~6ztMEqIKamb09W~D1gdyW~EbJQ6L+LeoFLtC84Sj1+XNTwjAm3AsrqONb0i4W7SPCULxwDzZVXSseNXlFRHKrLiszOnRX2Ng6CZh5efnX0SzPvwDn7d84NTFLHtQk+Pl3FPU7y4dT3R+KW5Tff1BpvL20kNf8u1QOL0zIwRGa45ckBiM~xB0LqHnaQCLaPyUOfQumYv~n91Ewbd~NyUuP36w4ewfz1h5OHz55eePCSUtDuvUsVERGJYrDQ6OEzFqndnWq1ztEtRcLCyuZsZHo9vHxPXBv5QjcJYfvUNTZ+h7R~qfZ~SnymdjQvTnyYgMxKKwR9fvhWJkei+zoYPQdOgmHLz3C4cuPMXTKLoxbUIWDXzzGgfOPnh+88OjZrtO3n208~H3e2oqLTcs+OKZqpHZ~t94wc9V4CGxtnG5GuqnxIUW4enQmPqGp72lafzyqGyoLOqNdkAeUJhL0aOyB8lYR2JrTHDnRQcjqMwofnr2LyktPsGTbFxg49gNsOvIzPrr4hNuH5x5gzoaL2FV9C1UE0IYDX+WFRySoWL~wzjBAbacWuGi8TtjYqmFiLIaZVApzMjmZqUQCudgYEqEQBdQiz00OwcZuifx2WVavQuz55BY+omgzm7rsBAaN24iqL5~g0CUtACXLzhAId3GE9vH9Fx8~6NB1wB2ZqfkFN3cfm~9Z7f9bDLB2FEjEJvtbtstB2eaPUb7lY4Qk5GHG8kPIn7ABMhMzDI~yRlmrcGzNTkbnEC~0H1qCXaduEO2ZU08weckJ9B65kaJ~g0ea7a~47B42HvmF2EHpQYAwllRefIztJ37F+oPfoHBC2RFTU3PvemeAWCxVODi53xtQNJNH6aMvHiGi+RhsO3ELuz7+DW5e8ZhJOX+ksBPSghohpf0ItM6ej8VbvtBGlpwtmr4XXQev5ExgjrL9i7ddAeU~B0MPwCUtYMz2VP+G7ceuLRyc269+KwKVwZhOPQpw8MJDHP7yKRMvRLUcSwDcRPm2S4hvlY9xbZuiqqATmnm7IjV7OnoM34J+ozdi2~Eb2F19EwVT92B46T4CQOtcFZ2nbPtXHIDKy9qUeBkAdsz+s388Kdt4bKdUYuJRb6kQGpU0YfysdfoLZAxo0XkGyrdeQGrOYizc8iWi4tpgSWYLtI1vhv5j1mHL8ZsYNHEXBo3fgnHzKjF44jZeCdj4irP3sKrimhaA6j~0533ZGDMYe3Z9~MvzaWW7j1Ea+r~WUVs7F5m1jZObytLOzt7excPR0T3ZxtbZg4mXo4ObjHr9f3w~TSqVKTL7jLx29EpNdB7zi1q2+yqatJ2A+Zsv04U+wo6Tv8LPNxRp3Uux~tBP~Ljtp25hwPjt6NJ~OTZW~Uy01+b+gfMPsGLvd5i09FOUrr1AgNznuc9TocYuvUgLdq4dp37FlAXbDktNTLUPUhwcXAeqVLZ9GjYUlFO7+rXMxPSBSCT50cjI+Cwh9UwikT2QSk2jHJ3ct6tdPCtsbBzD~snTorCopM754xfxGs4ujKVBFTly6OIjvL~~Kv~MLpLqOVpkFGDa0qM4QA1PlU78dp~+E9tO~s6PYfuqvtRSm+0bNPUocsfvR0bOCGJJBTn5O2cJO4b9lj4ldGzYcvgqGBv5xTmpPeDs6IRFM8Zj8UydzdAZ2y4dA42T4+cODpp7DvYuIABOGBtLrFzdfQTMsf9kIWAD45PSr9dcCLuw5Xuu8hTQU5T2VeqiNr7sNDYcZqr+VP9d1eW6zlTpyt3mY79hwJQj6F9yGFEp~RAan4VWGQPRe0gJVu~9goPHjt9FAK47dB17z9zG0a+eYtL8zbNTEpKEDXy8fLBzfTlKcjsgt0U0ejePQp+WMXpbOLIv1pXNgJ+3D1ydXeDh6gojQ8NboRr7i13jG6damClkjbwC3+i8QmEdIzIyvj5l4VatkzoHBk8+gLUHfiSnnurpWuPY6AWn6GJvkHM3OW3Zd0ztKy8+xEcXHlC9v8~zf2Plj9h64ncUzjrOQRgy7Sg03nEQCAxPEaN3NmnZ61lx2VHMXPcFgVqNaavOYTsxhp1r7ye~w9zC8koDf29P~Pr9BYzMTkMzF0s0c7bUrsmaOquQ1yoeX5~5EAFeHlg9fxIObloEtcIcv5QX4tqCgaf81fb7LRTWneVmShF7HMY0xd5ebeDk6OZs76BxkMuVezVuvthJZa6GuszR3mP3ctFjNK7Ug~CUHzNy3kks2~Mdpqw8x1nCvtt35g+8v+8SVu26iCVbtbZg~ac8ZbadvIUh049iMAPAKwZCI+OuCgsrEYFQERTd6V56bjlGzDlOvcMv3Hl2vt3UMZrKFWjg6abBne+P4+6vV1B9+EOcriKr3I3qyj30uQK~~3AeX53cCi9XNRxUFtBYq6BRmePLGf1whyYzB4d3pW5O8oRQryYrp3n~SKFQtFUms7hpbCytUNlobi3ccFRPxarLNQDsw7xNlzkANSpdA8KyPd+jcOZRfe1nLCjb9DkOffFQx5THHJjFm87z8+777A6Glh7DwKlaAEi~Mll6mpmYCWh7c3LbvlrxvPJUCzj9~p7TtQD489tK3PnuGNlR~Hm1Sm~sc~XuMuxfPQUudtaoKOyMn+YPxrBYf8R7qPHNrP64u7IIBc0j4KB2R1KbbgiLaYOk1t2QnKq1wql78cHh67oW9anegaLZRxEc1RabKq++SAEdOEzdh88+DlYxdG0tFm88x5sffTrQOZZuPc+P33vmDvIJgEE6AKjf0N8ya9jQcHnnnoV6Qawx1lq~YAA5~+TuzxyI299U8nWNndw2nwCYzAHY1K8drkzrixOjMhFsb4kQtR0+GdEVQwmAth1zuaKPXlhNEbnPnT3CReomL1Nbj~9GEXjCp7JlO77FgMmVsFCpsWbvBa0QXnqi14ODF+4TACc4AIcvPdYDwOjO04Qz4zGlgxaAndW3KfpHeAq4+SSAGNhZ7eyuA0CwnTVfWvCf6n9DzwAfdxfcvnoED3+~wp2vMeb8H18fwvGtc7F3eTHUttawMzOl~DfjZi4RUypY4NCANAxvEYm0Tn34hY5a8DGvxzX5zCi6kxS4dO15HKTIrq+8QWJ1BAmphc8FhqJnS7ac5o5pq8Fj3iEyAIbNOkbg~Yq5Gy9rAWApcPExj7w2lR5j5c7z3JkPqn4hQKuIAUeoTV4FpaX6MqVimA6AnR2y87Vackk7np1nbw0DGjk7Pj93cB05WzfyNXZi6zyMHdAVgoYCbMhLw~lJPdmzOMzqnARfeyv+NHdIcjjaZPTmJ55Yfkafq9poaVHnqn3kV0wlYUvNmvLc0tplnVhs0tjB0e3W+gNaMdTaE94fLNz6FWaw5oYmOqwcMspuOPgt3q~4Gmv2fcXXu6t~43m9iVhWsvwcZwEDQWWtATmexgAgXdocHNOZAzp5+WeYvOIsXcNZbKq6TgBYoIFG7dw0NSnu2Zl9y+qAwKJ~6cgGVK4vRYi~17P33jN45kMOR7k6IEJjBw8rBfwdrPFFcQ~kxgehTYdedJF~Yvzi09zRLcd~xxYqUTs~vsVt~uYrVK5OUOs7EU6ujbfSxMiJ~WkcNV1n1314QQ+UNlefYvnea+TUZzpmPKV0eIqPzt~Fh2fvECh~kt3hDOOqTmPXHrzBWTBg8uEaAFrrGLCyScscrKGSe+DzB7zhYikzZMohSEwIALmphdRSqRyclhiNT~YuxdkDK3HuwAqcoNyv3FCKdNrv4uDQkfIqhk726ahWUdg~rDPGt42DKc3f4zycEOjhh6ZthyN~ehUG0gWw~B4whba5HaaoaOnZvHMx7J0DDguFRiHs4tjfBxIAF9fs~fyVZqcGgBonaypC7f6+pkli37Emh1WB~iWVNQCkSqQyD2LAkYCQJBROWomJczdi2pJ9vClas~97UOmGbpoqkTvYOyZHBfs~igr2Q2RjX4QH+iAy2P+Zk41VNjU7~H4~NTRRTX1c96f4uSHaQ31BIBB2FRoapamsXcutHQOgdo+Ai2cUKXE0XMk0XlH6z2zbXu1XITaW6icikWHRBpQG+e27Dnxw4NyfdTq9VR~+QClwnjrCG9Ts~FZHwGrSqzYY7390nYNeGwCqBguDne3Q3N8dKT6uaOrpjAhvb3Ttv5AqSLU2BWpPimhANiHWnxwbqF0b9jERm9R56kLRi6P9ebRuWbOPWmMN26cd92Lsi3Np9xkZifxf7hQpCnK5meL2zlPX9QBwhw7+hNI1n3Pnd39yu47zNYzYduwHjJq+ChPmfIClu75F~0mHuDEA6PdKE33dj308KRf3dW+ksRuvh0Z0Q6CjDX+7jIQS9X6TxFSulJvIzG5tP3FDn+9cB2gyM33Ned7A8GhfflHGmPDt~vgGCoumI8RERszyRZe+M5DcsQQtu0yCmYUtAp1sMC2jKaon9MDtJQX8vUT2tOnOiiJ8SaW8bZAHTE3N6x8AqYmZQiI1vbdkxyX9FLmmaWGt8OLt32DPmbv66LMZ3eaqaxg+bDKyLFXY7uOLpmnjYGvvjoYCIWztnEGTL4xuHY0IEuyiZiG4MX8Qf9jCAGB2s2wov~lKs9z6B4Cm23KSoE~b95pNHeB9Lb2vaJ2dtOwzjKOqsrLimn7~tmM~oW+~MWhubo5dAZTPmUVo32MOunQfDVMzO~TOLYK9YyOit4j3KkeKuuAeezuFv6Axkj+aY7fhO4R4gn67~gHQTZftJFKze6t2X6BSepMmPmS0nrD4OBbTpIfdxGD7Kshy80uQYKHACnUgspMHIDVzJqZOWYKuPcfCI7QP8gZMRFRyIcxVzugY5IkN3RJ5qWYPWu+zx25k9ygNOgR7QvyuACCTmUlJtG6akSrLa8xMAaXSGlZWdrCxsoW1lQ3fL5GYwNlOjcQWI5HefSbGT1iCEUWlcPVPQ9~+E1A8sQwBzcYisf0kuDcKR6~oQKzLTsGOXi1xdmwWvpmWixNjsuBro+QvXb4TAJAQmlOnedvOwhz2ihqzQEZaKgb068utZ04OzUYV~DtLUxksbdyRlVuK7rnFcPNPRWZOIVYu346QpLHokDMb3anUdewxA57eMTCVSJHgbIsFrSNQ2r4JpMYSNmNEeGSzd4QBpgpzqtu37VUqcpKZEg6WVmif1g79+~VDv7x+yM7qAbW1Ff~e0sycTXjYY3LKd1fkF0zF2tU7Edh0DFwjhmPchOWYP~d9DCgoR7fc2fDyT4SYHDYRGcFKYUlVI5ADEBmT9G4AQBejaCgwvO3m3RQuHrFwdteaq2c8NB4x~HmBm1cC7Yuh7+Og8UyAjYMf1E5umFG6FDt2H0V0q~FwixyO4SPLsXDeOpQv2oCF89dh2Ohl6Np7FnwCk0HtPKWUPWLj20AiliI6rvm7AQDNC4gBhre9G7eFX1gG~MM7kXWEd+NUcjoOfqHtaX8H3X6tqd2jIZNbITA6E3HJfTBp8gqcrD6P5Us2o2wBAbBwPZYs1oIwdMRSpHUrgVdAMrHGnLQhkJfAuKatXgDwTx8gRsUm~eWzhf~r+QL163JiwHJre9~nviHtOAB+YR35ujYAngGt4EWf~cK13~kEp8HBJQwyczt0yJyIdWt248N9x3D+~BWsf38XlpZRd7j4AywhJsydvZZAWIL0rCkIi8mAjEBQO3siKjblv2dARFiU8L8BgKJvYygUP~cmh~xCO~BIcxDIaeYkA8A7KBXuvilo5N9SB1AHDhJjjKMmBC6uARgwdB4+WL8PRw6fJhC+xOaNFRyAsgXrOSPmznkfI8YsR8cc6h6j0mFurkJ4VCL+MnqhYbHsv7kIQ0OjBWy75mWkiIh4~Z+nde2U7cReQa~9F9t~Z6E5hYqalkfewe1qOZcBN58kOFO+2zuHcRCc3GiC5d1Md8wL40xwDoZa44+RY8qxcUMFTh7~DJ+cPo~NH+zjqVC+SJsO80gYi8YsQycCITgynd0VfjMA0XHJ~5ED4eH~~O1rmYncylhsMtfKzpvon17LsQ6c8s7u8bC2D4CZwhliqRIqm0a1WPDiWB8aa+8SCt+ApigcMQ8b11fgcGU1Tp74jDOBOc9SgRmrDkOLlqBVx4mQmru~GYDwqCb~UUT~aeQ5AFJTD6GRRJv7jP76FNCxwDsRCks3GIvlbOo9W2KiOGHn1PiV47iRNpgTUD5+MRgxah7WrNqNUyfP4tSps9iyqULPAlYdxk1YhugWoxCf0g9~++Eo2x8dl~ICqIi4f84AqczZSGTynKt8bQB0azfvJFJ6Wza3X8jTxVA42ELlUlcraommnTqUjrehkpeIvIGTSQz34uNT51D98Tls2~whT4cZpavRrdcspHUegzGjSv++CDIAImq9PRoe1fQfMUAqkbGXJSIkUovneudD6zrPom1ianWdop+nBcCovxaA9q+CQJ~t1eE0JgRGIik8~WKRP2w23qfqcJKYcKTqNGbOXIseeXPQrtsUlE5dgnbp3euvD6BOzo0u9J5Lo~gXUefWnptLowQeTZojlNQSzHRzhdMFNyaG+mNfjNMCEMoBMDBoeCowLPXbQfkzsXLFDqxftw9DisqRnD4G0yYvRma3vHskvlvrEwBvyu1nNQ7XdoaVPbVb7CsAaO~yCjNlZrbafqDO2NoAmLBWN5F+o79v4xY~ZvccjYysCRT5yZhSsphF~hGdd2loRPzbeYf49W+LGHkQAE9eAYDYwMoec8TElANQVAc4I1Gy3MJeB4Au+lQFWDm0V4fVAUB3my+fWuB7wcExmDBuLrpn9X1O51z38v8fq4fXZWoDUFcDagCQmqjoYoXFL71mky43t39pTHsqjy10AIRxAOj8ybV+aySd55pIJL4ukcjWKSwsBQ3qe3kVgBcsYADIzR0hNBIvpfm~Vd0UMOwgNVE+0ZBGsMjXHstSgJkWAGFLn0bae7DU8AhlJmZSuZlSJpOZieqF8n8XAEZ~Kn8TXh5na2UvpCimS6QKvOgftOO8gtqQdsTAytaXegezi0ZCUYd~5WLZf2P596fAYrc3AaCmqbA2~wWjXzfW2FgaaCQyhS+fP9QVQkdNFE8fkdicpUFeg3d10TOA0fglYxVAB8DY1wIglsYYiWRc+PTjQrVrJx0AxgQApcvAdx8AHrmXAYj5awZwABgD2kE~ntYsJV4AYPHvARATGWcQ0DjCICAo3IDVztDwOLY2+O8BMHtSO3p6ANxreoDXM0CpspbJTBU9LVTOz~Tpoxvr5BqtB+BfSwEGAPvzM~av6XR~pfFf~3NCPQC6yOmNosoBeIMI1noc5yQUGj96eTwDgJVDY4ni3dcAKldPnFwj6aIjSLzCuDnQtNbSxoscMGcAFP8VAAJDowe1xzpqwvlYlXUjEkE5jAyNer5zjouNpWJjkcSZ6ntLYyOj58ZCI9Q2kVAIkaEQAoOGb0wBVtep04ugDu~J68bTeWEoMPz3AIj8l~4AWS63kEslJr3pQp+Zm0if+zg74mVzs7WGq40V~zsCErFXRNDERC5lb5aYGIvvmBgbvzLew96Wn8NULAZNnjLfqeiLRMY9zWWyZ69z~HUAvKwBVgorocjIeLSpRPLoTeM9He34eKlIxJ4d9H+nAKCI5JiZSOHlZM8vtJGjvc7suDlZKmFtbg4nlRJmEskrGkCdXQ4xR3+8N52ntrF97OmSms4jpjR45~oA9voa5e0DcuxBQ4OGj7Rm8Khm24C2BfSdoGHDewZ0HGlAXQCMRB1pPD+u9lhDgeAeOXuHjaVxfD87juYD75YIys1UIpqRKV42dmeYPR1iVns~KX2dP4u3UNgw8ePHM2PHsM8SqamCPV~UfhapmLHvzf6Dic~~Azzsr1ZC+kMXAAAAAElFTkSuQmCC'.replace(/~/g, '/');

const HERO = 'data:image/png;base64,' + 'iVBORw0KGgoAAAANSUhEUgAAADgAAABICAYAAACjpDbfAAAWlklEQVR42s2bfXAb93nnP7uLt10ABEGQFMR3kRJJibJIRbbFJJf2JPVcO+5cLMW5OvHFVS65m8w5aZ0241HTi5NJMqlz49idSzPjmToT1W7auYlL2albq04t1Zc4lizJJCVRL3wT3wWRBEBggcXr7t4fAJaESMmyZcn5zewIWuyC+~09b9~nZQVu8dp6x52mTZJIpLKYeg4AQbID4HJI2CSJvK6TzurC6MX+D~zvC7cKmCx7zOC6ekSbvey8aRoIgli8xkU6q2PqObweNwBxVRXGx859YM8h3gpwlYH1Zm3NOiSnYkmsBKDC68VX3YiRz6HGohj5DIJkR3RVFQ6b02xuavvAnsV2K8AF~AEEyY5HdiC6ghjpCHFVRc9liKsGQiJJVI0X1FQWqVYUsskFbJKEkc9gc8jmB6VdwgcNrqrSb0kqGlkkltQAcKOvut7lrwUgHA1b56qrg5h6DtM0GB87J~zWAAw2bDIBqv0+1FiU+YUrOBUvPreCzSFbKrpy5XUdmyQRWowQUBwk0mliSY2GunrUWJSMIRKaGRE+dBvc0NJhplMJFKedVCrN~MIVguvqaairx19VbYHL6zo5LUFe1y1wsaUlZJtI2hDwV1UDMDM3i2R34hSND9~JtG3caqbyBi7ZQ2ZpkbnZCXyB9bi9XisElEDZJImUbpJKpVFjUes3smoUWXYBEPAHyGgqmaVFPC4XN+twbsrJdLV3kdINnKJBPqkS0TSqFAWHTSQ6N4XD68cw8uSTKja3F6~PT4XXi5pIIoo21EQSxWHDcHsBChuRTeNUvOiyB8EpI2bzN+VwbkqCaUMwTV3HX1VNRNNwKl5c~loMI29JpgR8fuEKY6MXmJieQpZdGEYeI59DcMrYHDIAs+EIomijPlBFOpVAjUVRHDY2dmw3b7sEgw2bMPI5RJudaGQRAJ9bwetxk9NMNNFGVI2T0VT+9OOdBP1e694njwwR0TR8gfVE52bxeytQYyke3V7P029eoKOjC8IRYkkNj8tlMaDbClBx2k09l8HnqSQaSQHg9fnJ6zp2xQPZJdzofPcP7uKenlbqg4Gy+586PkU+GcNdlPSB3V184d67OGf6ODpwDjc6uuwDwMh~CABlSUDTbeT18vhWch7zC1f431eB04vM5pFP~S739EyXgZ4NhdGdCvu2NfL2wBkimkat21uwQyN9+71o2ijYfTqrk0+qOBUvaiyKKNrIJ1UAjkRE4vGEBewXpyb4xakJnn~5DQ4cmbDOA~zhz8~y~MtvcHe1xP7tTQB4XEWuahq3X4Jjo2eFDS0dJkASqczlA9TWrOPQ66+zb9t+Nmc0Pv~3pzj8m+MAOBUv393diZTRrPu+uEnh8VdO8OzgPAB19S04qxpJLUxa5Py2M5nWti1mhdfLxPQUGa0gRTc6NreX+YUr3PuxnXzjzmpeOjVW5mQAeltrqajwEGxuJDQ5TTye4Nj4PEciIod~c5zamnXY5Yqbpm035UVLy+dWyKMDOkkkfEAqlWB3VUG1SuCORJYlUdkgczcgZTTi8QTfP7kIiOyuMhhubGY2HKFarrgpB3OzXhRZEhgYOM5f~N6dPLLrPwKw72+PMRuOIMueAumu8ADzVDY088NHP2Pd~5PvfYu7d3WjOxWOjc~zw29+HYA3X~452ok5fG4Fj+wgns8gS8LtdzKyJKBl89b~XxsY5+1Fnb4~6qU+UGWdj8cTVDY08~FPFcDNDA0WPOmu7jV~t3ljO9~Z+1HmF66Q13UEQSQjOG4~QC2bR3HYymxqaWaSeDzBl7trSaUSlgTvrpbIvdkHQEPXMrCVYaIEvKGrmwtnzuILrMcmSR9ewhtV47jr6pFlD+dMH48UVfGlU2M8sKONH31mF72ttcTjCTa3NxdiXRHk1eDu6WnltX~~JeuWxlYRAtM0cJnZ2y9Bn1sxk6pKfdMm3hmZ4LWBcXpbay2Hck9PK4AFDiDY3GgdK5f94~ss0KXYmE4lLBX9UNIlu1xR2GE9h7+qmsdfOcGx8Xm+cO9dALy9uDqDlzKadcyGwvz08AlCk9OEX31+bfUqqqhd8Qi3XUUTyYQg20TTyOcQXVW0bezk8VdOAPDs4DwPNMncvaub2VB4ldrpToVgs0JvPMFrA+NlEr96mabBwMDx2y~B0MwIQnGHo6FxUqlCHvfNIxcYGh4q86JXr+Ez53n+5Tc4Nj6~6rqV7OZ6KrrrS8~R+8mv3tqEd3zsnEXXjHyOgD+ALLtwyR4O9k8R9Hvpba0tk9wvTk3QvLGb++8rDxM~+d632NzezKGz8xzsn6KhrglN0zB1XVirmBw7+48A7N2zh8mkA0B459irNw+wkMWbZsH+lu2sVODVNI1gdRUT0wmG~22I3v9Ry2woTLC5keEz53n74FEu7DhL8N9~uawNUdX6fOHM2ULyrGlomRyhmZFVJZLS55aGQrxtKRTyzJYHHwYQ+l782XsHGGzYhGwTzbC27LIDynIADmsZ0sXYp2VyZDSVPkWhfXyee3o8SBmNigoPFTuaLFAr+WnQ7+X88CRPv3kBX2A9kaXo2t67upGWhirGR0fpPzlOKm+QTiXYvWu3Zbb7HnyYvr4zAsbpGyPbbRu3mqZpWBLzVVYCMDE9ZV1zdd1zNjzPjz6zy5LOI7u6y~LCkiddGR6ef~kNvvrzozQ3tZFPqsyG58uer6dnpym6qmhpqKL~5EkUh432xiAAA2MzbL~zzrJn6HvxZ4J0I+AEyY5p6Ph8Pmx2O2o8TkpLYMulcWDykGHy2Qovu5xO62gW7OT8Mp13bOW5k5NkomFaayqo8CiYNjuinmN2boFMJktNoJLLsyE+~dxreHwBPJ4KJmcvlYF74Wv7OR4yvp1NLqCmRcSsysG9W~ni7+9gi03Dnknyy7MTqKpKoLpQfty8Zdu3rynBnp6dqImkWaq75LMpq0q9FL7MV~21POT1Lcc4BHRM698LosETqsqB3V30ttay~9BZAA7cfxd3V6~e131~e4zx6Ul8gfXINhFBkspSpI~03meOjwwAkNFU7v3YTl743A7OD08WCT3sfvqfSCLR0thE68aN17dBNZE089kU~qpq1EQSj8vF9z79CTodqcLDLiwgFTVcx0THtD6Xzu8zCjGxt7WWL3fXEoqqPPnPJ1gKL6wGaMBul8ILqQRufwCXaNLatsWUJUEYGh7CSEcsUzj+v~6Qtxd1~vIfjlikPR5PcGB3F4+~cgLRVXV9J1MZWG+WikilsvrBvVtpv6OlwCz+dQJYsACttToNEXxeWFhg~6GzHNy7Fagl6J8HCmAP9k+xz4Aen5dOQyxsjLrEC9FwIeRIhdJka9sWcloCv7cCw8hTHwywNwg~nfFaFLFECVsbm4lHQ1D0sNJa4PzeCgRRIq2pVMpO+v6ol9bm9Yh6DtNmZ2H4IpnLMbqcTiQEzKKKisXPJcjVpsBWp4tkNMIzU0mCzoL3TKSznDN97Jyb5yGvj3WmaN3X7ZQRMimOZdI4XAou0URHJGeYCKJITl3Co+cYGJ0jFFWZe3OU7h0bWAzHqKjwkImGeWP8Mhs2bFgbYH19y7dNw6CytoXJ8XP8+e+08~Gd2xCLtUnTZqfNL3Pg2DB6JoMk21kUTBaKx2LxKD00YIH8m4kFBkIxBkIxds7N0+PzUm0ub8wF0aDWFNnmdCFkUpzJJPE1bMal+HC5K4lEF~lvd6xj30c3E7ZVsDg~T+ZyjEsYdNZVMahKPHdykpqGDiorZADBdrUbji0t4fZ6iUdDtDY2r+KIpRJDaQ3EVPrEclvq8ZXXXyQEHvL6eOhq8m2s9nFDok6nIfKwt7KgriMDVr3n0e31VrjpjE~SuaONY34vw~82xEvA3w1HCdS1WwSg78WfLdtgc1MbeV3H7fWyGI0RUByF7DwYgIxmxa7zw5N8~+QiEU3jOaBKUfDXNTE2eoEqRVnTHkt2Kl0VdleeL3nd73i9licGeHR7PQAP7GgrS70qKjzE44kCFfy9QrV83aYdFri9jXahb6WT8VdVmxsCHi6FEzhFgwea5ELeViS~Ukbjp4dP8PgrJ2jb2Mnm7k8wNzOK7PbgcNfgVGbZZ+irpLcWoLXWQEy1qP+QWCANR2pqOFgEpjsVi0qUCPn3Ty5ydOAcPrdigTOjIQR~UPj8MweXs4l9Dz7MhoAHwR8ktrREPqmW1Ux0p8L54UmeHZwnuK6e9o4Oq~Bk5DNkkwtkNHX5Qd~nimiadf8TqsqB+++ypFbKI0tV8OePDvLOyATV1UFsDplmd4FCCv5gGRcVASZmIqbgD2JGQ6TyBvu3N1EfDCAVVTM0Oc3+Q2cJa1m233knZjRENrmAaHNS4fXicNcs2~F1JLjWWqmOTsXLc+llkEszk2Ulf4DQ5DQHjkzw4~5ZbA6ZCn+Qbc3rEPzBVUTbioMl9G9dnOKLnT7+~LO7yy6KxxOMT0+yufsTmNEQZ2YijF7sF1rbtphqIkc+skhrYzMsFGJjlyFdUx1XkoMy3ihCQ109i9EYfakYEW1ZWlDgrM8fHeRg~xTOympaGpso8dIV3HN1ZXvvnj0I~qBpRkMc~s1x~t8f30~7HZvLEk+Anx4+wTePXGBXzxbeGZnA43IJWjZvCpLE5bkpvuRSLOl1Gu89j~4vyRiz4XnqA7X465qsJk6pz2ErNkljSY2Wxibiqoqp6~S0NSD4g~S9+DMBcRsYp8sz+mKyyGTSgVPxrsqqS+rR21rLUvgybw+cIZ9UyQgODCOPLAnWfVdL6d1Uc6UHjWgasuxhNjyPTZLw+vzY5Qrk6np02YfX5y+EgCK4Ug56KZwogINV4FZRtapKPy+dGqOiwmOlNqHJaYsOlRxBa2MzqXzGBBCcMi7ZA8mY5WQ6vb4y23rP9Z5Ulm13bLnGtwWVHBwYxCWawrvVa2wFEluFkY5QWdPMj~sHyuLOawPjPDs4b~UV6upbsCtuEsWurhqLIqXUMidzAWOZW14jPKw8NxBTqVIUZsOFGs3s1Age2WFlBGs1jcZGz95YVW1g4DgbAp5imKgCeiyQJdV88sgQ76TTFO2V8dFRq6O7GI3xmSJ7GYipPOyttNKlkj1eT2V1TPpEkKvroQgwlUoI0ciiCRutG81oiEOvv~7+22d79+wxi3GksKv9~WSWFqkMLIcAu+Lhz3Zt5pm3rljpS2gxgpSK8R2vtwzQSpDXcjyl759QVYsNFUv+H9iA0qof+kjvfWYpbJR2TJY9Vq8h2LBJUJx2U5YE0oZAOBomo6l8yaVYKloCs9IOL6wx1FPajE8nl5Cr6zHyGYqThrcO4MpxyFJ+VSgqZYXQzAiy7DFra9Zhc8jIsovo3FRBvYDFxRCfN~RVQK+3LogGX7lypTBZASxMXyKJxFL48q0Zxtv34MMM9PebPdu3s7fRTvPGdiZHhwsSnc5Z9jAyH8PhriE8N0zGEGnZdm+hEHX6cEF6qdiNOQG3F7tcgZHPoCgKqVTamikdGz37wQ7jNTe1MTk1Zvb07OT~~PdP8dgLv+LKyClsbi~5pMrOXf+Jx3Z18VdHh5iYiRANjRNV47Ru6sFRVfB4cl2Bw6bmBi2wAB63Z2XZH4~bQ3Xbfyi7~sLxFymNYuoZDdFmv2mQwkpw8wtXzNqadVYdpsTx9jbaOTSd4+LpATq29WBGQ0wmHYWSfd6gZdu9ZCOj+LZ++pp~KDU3uKz+dd3XvOby2X8hUNdOPBoqDMvepCStQG9zyKZTKcyTxVWV7pb1fG3fHqsp2Tw0yGMzEY4f~SU1jRvI6zpRNU7nzgcLtdLrgLvhrnFdN+uB+YuvI9qcCIKIaRps7Nhujl7sF95382VDS4dpmgYNdfXMzM2i5zIWOICv~~Xf8~tf~z7N7ixydT2hxQhJVS0wmBtYJellI6OrpLlmz+OSjdmp5ZL9zYxyifsefBhfZaWV9lRV+tlxd2~ZRafePsZ993+KH37zT~nWJ7uRUjFCV2apa9h4XZVbaYsTpw9bdnqtNf2rH3PXW~+Xv9jtsKoDiqJgmgYbWjred~vMFF1VJFJZjHQEPZfhqa98zrpgcnQYj8vFU1~5HOFXn6fTkeLA7q7C2OS7PHDJcZQGWydOHyYbGSUbGaXUHSqt84d~wJ9sq+Qvn9rP4~v~gCcf+ST5bGqZnDsV833bYDa5gKnnCC0m+Fhvb9lAAEAi~StmhgaRV9C3ysH5dwU3cfowGU3F5g8g5nMYRp7xkQHL65ZUdXHs13yx02cVuKSMZlW~09lCj~D9qqkI4HDXIMsuYuHLPLara9U0RMYQ+fwPflJ245e7a1kc+~U1bWri9GFCMyOkUgnmZicIXZklltQI+AOMjwxY9jhx+jCjF~vpvGOrleDOhsJW5c4jO7jpHr2RjpSNGJfAzQwN8sd~83JhICCplnVk7+lp5U+2VZaBLB3nD~8AKRWjMrCeysB6Nnd~Al9gPUBh5NmtMDczat0ryx4unDlrDSrUBwNsbm~mI5taCC1G1pyuumGAZjSE6KpCsjtXffnYC79iYnqKlsYmdNnHU8enLJD1wQBfuPcuvvXJbhLTb1m2tTj2a5yiYdE3gHeOvSqEZkaElV7XKRrMTo0QC1~GqXg52D9FPJ4oS7a~cWc16VQCQbLjEk2rGfrC1~bfeKD~SO99ZkmKeV3H4a6xGowT01M01NWjaRqizYnLIaHGovzXdj+P7Oq2xkGGz5znpVNjPP1moTZa07iBuKoSWYqu4pSlV35KPcacliCRTiPZnXx2g2IVdkvFrt1P~xNydT1OM0tKN1EUBYe7hmxygXRWLxH0a8ZIWzwasnR9U62Pty6OMj6SwCV7aKirJ6mqiLZCeRCHQsYQOdg~xUtTKQ7uLR8wWF~XRGVNM9HQOKLNjs+tsBS+yvmkEoIgSSaA6Kqio5jUjo+OcrD~Eg~saCuqankRWXDKKMBiNEZ6bhYAl+xBcdppbdtimrouXJq4uDZV6+nZaV6dPZe4ZokPlrq8WiZHOlXYAKlY~apSFJJIVFcHcTkkUqnChK5LNIWVExdXk3rAnJiJ0OzOIviD~ObY23y0o4knd7cQbG4k3HAXM0OD~M6j36CyaMM+t4LH5Sp69zRen780rIAgSate7LIBDAwcF0RXFc3urFkqQMUWp1EcNmFo+Kw1ANvV3mUKLicet6cAxOVkfWWhtS07FUw9h6YV+GMynRHGrhoguKq9bG1wczHZBrgUTnClsg17Q7cVh3t6dlo9vxef~Ir1G3~23acZGJvB7fWiaRqCIK56BcG2whHwzrskmkPDQ0JXexdpPWems8tThxmbsvxuoCDiEs3rglt2ceVlvoDisCb4oTBaeWg6R99fPbG2A~EHyapnrLfcSlMgK7Xmlr0~+F7W3hUSfOviFE7RsLpEJVa1knzMDA1aKVuJqJTySD2XESanxm7d63U3kbaZgj9IOnWOuk09fO2j62je2G4BWwnufz7bx9kzJ9nYsZ0Kf5B0Vre0ZyW4W~aC5Htdh15~3Sp2ZTSVloYqa4B25XrwwF~zn5~4EemszsaO7bgcUoE~F2PnWtP5vy0StFZtzTomZiJlknum73WODpyjqtJPS2MTGwIeJpMOK3aXpqzWioe~NQDNaEgAzB1393Lk6BGe6cuWeg7IsoeOji7yuk5cVRlUVWtIryS1Cq9XuK0vKb+ftTI2vnPsVWTZQ9vGTqty55Ed5HWdVCptvTcF4PW4r1nCF37bVHTvnj1myR5La3Bg0JpRW3nuRmo1~x9LnrvEL24iBwAAAABJRU5ErkJggg=='.replace(/~/g, '/');
const SKY = 'data:image/png;base64,' + 'iVBORw0KGgoAAAANSUhEUgAAAZAAAAAsBAMAAAC57vNFAAAAJFBMVEVX21QxcFoNUjkdMT0ISzQFMSgHBhIBAQEBAAIAAgEAAAIAAABoG~PHAAAQiklEQVR42r2ZbZBlRXnHf6dvb9gV2Dl3ZjGI492e3gFiQJjZQSsVL0Nz91AWZUU3IhBjBSmj2VRexDJJWSk~SFWqYlKUSDQGeVFiKohhcJmYikT2MDTD9UvYYW~EhBQuZ3qvk~KF3TlnEUWgb598OOfO3AFSBaSK+TJ1z8vTz7+f5~k~~6dPdIjX+88vz1vZtslLbljayFTiwXQx1uAtySuzWYjXH4cVyzwhjX0JjraXMsVPIpOuaWMs9pUalXHjPdtfZxzdjnrL4Nh~7JleVtWVB5~UfqklUMvzS621+bV1iZpc1vhWmNb6FZoNMn4dQgCmawCsNxZ3lB~T+zBAivQAJNh50bbSyp6n3aVrgFeaVwA0rnnNDlo3KbDKTi4f1Vb5EIQXqcYLrMIvaUiz1pJG9OenhbJuMojJ6WXROU3pP338qTDjJpfnXUe31Jpa0l4PhNBHk9YLT3eE8llLIFrqlSd+iBZee0is8dIjbXw88dJLsG0k1ideYvGJ7xqs8UgsVUDa1iAt7VsW+WRimVRIrMFLLPjES4s30kvwFiNfhS9p9P9hLS+xxtKWI9jAyy1PpBLju4aiZzzS4hP8LYvcvGZ814BH1u~h147WznsJ6atJLFKBf60wUmSK8b7dTX1a0Sceb7t4D5B60i4+aRukwcYm7XZ9m6TmIpN2TfoA0vZs6k1qrbcqsRY8dC0kyavypnGNWJp6bUA0aC+WRavfERpAgWa5rRECQC+rbH5Z04+rm6n0HRGePjM~98ETz5fJeCvTuu+UPlP1dZpM6mXhXEeBSPVka0lj1atwJosOpdKMEEySQgIpxkqTJkWcEu37P~LKhnnohkBi2yBJkzQB66XBYtKkTrY0SZHeWEw3iEuevZbo09c18+bdvusNdGl3DbAkMHB412TdKW27oq5XUyPDpK7+e6zpGmu8BFLZBmnb3aoiTdUJzEatlwWnS8~wljW2XaW8m5R15luDxWBNKvH6AIDpjbtwC0J5CXiZR3EqTb28tIalDlhjXwWQw9F9NvG2mcu2xHrTbUMXPAmpBJ94C5K2tJiKTIw1dNtd47tti7n~79n2UeMBmSYpRuLpUt5VcNb1PW+s6XqJl20rvWzLpZsLpCE4IIPoS5nEm+6PDm67MzXSGt8tI9rSdyfXTE10rzwin8InpMnm9uHlMNusR5o0sQbfhXbXI9sgfbeNLNZbjYdOvQH4wPzS0Ls6X28F4JZB70Wr3e82magJLyzeMibIwg1w5fg+L4+uXRJRPkCSJthq3VdKn9joUIqxSIw1qbFIL9tdvPSJl7YmtMZMEARH9qLXVyrvhcrEFSOXHzlCszHrHyR6+8yW1Q4W0ZRAbQBhIfoog4ND5mgMaMwAg8U9M5t08mTRmO0N93VaDRPb0x1WIZDK86NDvmtS6eX5u3yX+WAbKnbhJT5XHroroRY~YjC1+vT2m4a3TvmQciinmo~5525Ca6I4x9vL97ektwDSPPseRGfEWhTDwrZvXVX~vOvByu5s+PYi5+5~eQ8AhNIQlU17fjzav6L7bayCy16WXXc3VmgMkKEsaZiFezjl3f~5F3Z+abjFX9l8+somiE75kPnrwyf3KIjKJi8swpUdJwIoF27YiqOKyaEzjlc~zr40SWXbmqNfccrBWy+WtJcv6CkH0IjCziifdeDCi1EVewmCIyG6797aa7H70VoSe8NQQJuuJ6m03RPVpTfcbhNvdYYI97tRk3~bg4TLEAp0cDAHDA7Cjk94GW4u2DUDOAVBZMqhoxgGB3f8DkD+jvMtQHlbbW7Hly3So5SVJgVk29b+JA9ebKnE5tyje7MqdGKsce3yJe9889wbv~~Gp85WygHJpJJLz7zDmTURcPMuSftBesa+Vq0w2HZKv+UuXBMXN79TbMKY+sxE6xhchbx0rCAvgLOA8nHwD5~382e~Q3Rmnud5med5kVOgm9sBcc73fr5~cOq7f3qRFSU0vzk0Gd4478S8K6b15HLArJGZfplkSu3xq2sBQucHIpyXnTv5XztOf8MpO949Fh26+eGveZt4mSZpkhokti3TfSvyfGukxZQne23p4e7Feoltdw5JIDggKqGJuALwT3y6aM5tKQIAFgCiqaq6gthMrKrwPrg~rpqx6T61sLEzHzEW6UnwkrIYxFU+JNZgPcZSaUrblt4mqfRIGqdddvUeazw+8UhvfWLhrsVtfyO74BnEXoL0AhABmMbYnU+WT6tIfFiCt1GJNJDu~dF16E3h3cyLGsmVLDDdqu9sPJBXUN5e3Dl~+sODsSIBf8YXP1vz+LkdIY2XNkX68qnFq8cwQBfjLSTeyNStedn2FqRvtO1MdOjW471nPnFpSReP6VaT8r6rYcdXIZXtLm0r28sXRDcg9pxeMDGGnL+6IIr~crpk3elhAwmP3Cv0iDxqlic3JoQF0YEgaOab4aqBcPxB3vReBaqPolket4zHcSFm7eQaGC~9Y8~dCOdcL5c6lYSw7W7bygvrgFvjZSrby9GhW~MsvPWa7wpOuyiIBy~lOLvyAwCX~0YD95bHZrZ2kEEPvUASMoe4IqOqaYD1e6J9w7aoydTE4LGNNrIgDQEnZk84QdBBZHs2gMBCtKtFYwZWNrXsSAd6YRE45XOPXTD202Y5WFa7H~aIt3xq2xfjagpKEy99L~r27XlGdptrF43QJwQHPOJqJhsxqEE5oSA7~VPFtCKK0~LpzuZIffwgSVU3oqbIuUFjw9OJndWllZoaYjgyW98t15fQyQjtC1pu8GW2XyNaLqtLTFxRw6w8WgkOcXPvbT2SShE+FP350TyD~nvdhtOa4BIynY2ojs292nPqHezayZ642qurYoRCl3ctMv0i2T3c8fIeEnBBE8UrCAVRXEYrYgNIASl~taUFrqyvwi9du7IlOkJp1xJB4J67EeDsGVaG95tVRMjER0Y9HomsUKBWRavXeFtv9gjiv+8VCiogPOLQp3ze2~k~dGiEelkgT9loqroVxXmmCb195bqrwrIJ5Iy~i8F3aT9zGpLfW42m8nz8z4pmqdzUi9XRUNbMDR3U7kT07dtPOAjuHCMU7KbXGHSWpEe2ZXrR4apDmjTBS4vxVh8QnWwDCAwOsuMmDiA6GejQpyWAIJwKE0OCPdkEJYBorAh9la2+v3x0xERZAFm242Mk+G7bgrjLae2mvu+2fd5JL9tIrAlLpmvSxsBgxf3BATe7Tal6afStO044IBz71sMR7bqhS1NGpIn1ouVISKWh0pRv~li0r9IJw6CVaQGIzkvF0dywVpNqOR3FOQGRTs88Wv+GE42YHOBw8aZrSEhB~PLHKxXQPHTyzGuqwyIvIa2PjqQ3P5gaLA~iunka+YQdXN74YO~ZAojK75wT5rsd3RfzLnGTDyu078+vPjM~7Zc7Cq~J1vi1DzXflOe7CxBs31HxqH62YPysmObYeC5KEFM5oqw7O~hFUVYrjsflz1fHo1Rnv~pDQBTxL3bkpdjOjl8AZ+bH1fvSlktav~9v0XgzBrfjvJ+tuWt+ZS1oL73wa+010cnM9FGpT1~OLlFnrgnRacVn~uTANx7~8WUb~Wn8SSe7JvXGyMSb6kQzPCyHh2Xd1OMvXpRzgANCGEYguhDiAAi00lortArVBA+QI7QS1YlhcNVyjyK0VoqsskUMuJg7bzR298HLIYpDlmUB9sZPFc4nSLpWGuuxUpKYFKSVGI~tiqcP5EzsQ1LWDp36zYMgpZflALDtFKRXXYPxz8T2kgceakZ3~8PICeZwC~wiSabdaKGXmVQtN1EJD2mqesRd+F3VB1CrexRARh5EORQ7Mi7uuw8g2reRpQ2z+AcHdBGDwXowqQRs4r0kTWxCEV9ZTJ2MBT761zvWXa2c3vy5Kv2zeugIbmvS31Mo0HBYxJslMDgoTcABavi4Wor2EdwcsBL6lXbPELMnnHJCkRH6ncq6znTFbiugIa0KgmG9zcGh4rKprbqdWkMLNTimj3wmmgJ0c1xSbDxyLB0+~k9bIJxd1fXh9ToI41uYMFI4ATrbeMcxFYSbK0~GK5yMM1D9gJg90R9CVX3I9jrIyITKaTK3ogE93ELQEFzeZK87xFXxSB97BGAuA45C9nxN8sX4yKlgVFJP2Res7mFk4O6~D4T6Wj~JgEyzpwyOumsfZErVLX8YD1fNqAQoiWIQVWk4UVWOckAg2njDNevBU2fJBgxwZHNMTMwNFj46ABxqVCdVtFlUwN2UHAWi7vjdK6FsvO3fTzH~+IFNIFEOPL44XUmPLLhpNWTfQ9GlzqE0UVmVswiOrOMU8NO4XO24ynmnAFV1E6E9wdWtBQihN0Mzh8Ob800QGayPH5mKgbE7buwBiuCUU30F298VxGC2H35x2zDvjo+ed4sXvjqWz110UsJnrx1RbSIx0Y47dm3UgFTDanxE7hMihCxzg4qBBI71qtJyyiIRCgTOKZorjWazSsqBDRa1MhEDgcxRFhBnRwsxVFzD2VuVQCN558eBVnB95WqOuXjfpXJi~Q3XNzc~9QDIPxn0ykdh4sR1X8C2058QPffxKtmisQLP2vytYieqZsvgNBGQe7errsvBkWbGSE~MRMs1Lqy4rSbqFwmYvibgWtXmuBmi1ks+T8U5FDFEcQzBqSDQoHozeGnbxs9eLeJRII7yS64oY06WZ5x34IPXpsRc+IU~vomorPRDxFm~~YzCKdBOeSuCU0D+5EmN06EfoMw35kGK8YrxBo9u+nRsZnNgxIFQEyDckBcVEG9CDQ7R6itSKPMmbNvfQyihqlqLAQzIu6KRvZHVHM5YRDEW+e~FC5MQP~+uy3~IsMNEZXYg2pcRMhCtgZUtgpsFF8UQEAq8rfZGKPB1XHTGUNHviQcrNICoWcSsRDq45d8EQj11htVZ2JY0N5QXBKGAB6Y2aAwRqqNyFHzv~d7KX18cpc~oi~dm0ARBSzQhXX~u+p2rh0bpd9v+W0k20kY5EagkeFm4AGhSoikQoeoFQod6GKjrOZvLg9PDdD7hKshNOOHQVdfIOHtm8HSzkgJkIKAlsozxWDdHxv9anv~WDGSf3EwsoSY2WCuEJaHCLPH~3E1j7zTxP++Hwu6Hf7kfnQldI9loBlCEQEXIRNX+ZjqDcRXcZr04BXn2ohOzzeOpTAStXBX7bK6a9dHBBVGZKPYClNzaHGWlr3+9MfP8yS2dUm5kpdYhuFmiwRwMFprbBncXNHYu5M3tTtfjqw6O4Db097CZZ4hOne1ZhpwJG02+Pq1u6i3a2LUCYXj4EMiE9qt6d47OIYppUha66vzKiareoSyaRcmsA8T6FYCNRr4gIjfpVyam4qRbb5+pT6aAnGIgVUU9VYo25uJhkIXQWkFA068MZkDmnHupnnfAYGWlV+8aWbbSm9j4LLNxBlnmeZ1JToE03lEeqYRdAZDneeXaeX01qvu8qPreDMiOUUA01Qx~RDxECjT21~u+hULLlYqLhS5dMziltSA4iHYidAWwno3nKNmsWSa01hoNlGitNaioKbZ+T48gw4GKXv78V5XHrxtl80BDlgEgFuqFbwyEBqLm2DGxReEWL~s9GEKmAXavNglOoTjK+Ho0rhwKhHbKoTgWVwYUZZEJRbFZtyGv0jNjoq4XBXUq1UXUiNeDVr0ZgDKCmdUqLrcNFc5Ftbmf~S9xt7nXIZ2yyAAAAABJRU5ErkJggg=='.replace(/~/g, '/');

const YUM = [
  '................................',
  '................................',
  '............KKKKKKKK............',
  '...........KGGGGGGGGK...........',
  '..........KGGGGGGGGGGK..........',
  '..........KGGWWGGWWGGK..........',
  '..........KGGWWGGWWGGK..........',
  '..........KGGWWGGWWGGK..........',
  '..........KGGWWWWWWGGK..........',
  '..........KGGGGWWGGGGK..........',
  '...........KGGGGGGGGK...........',
  '............KKKKKKKK............',
  '................................',
  '................................',
];

const BAG = [
  '................................',
  '..........KKKKKKKKKKK...........',
  '..........KWWWWWWWWWK...........',
  '..........KWWWWWWWWWK...........',
  '..........KWWMWMWMWWK...........',
  '..........KWWMMMMMWWK...........',
  '..........KWWMWWWMWWK...........',
  '..........KWWMMMMMWWK...........',
  '..........KWWMWMWMWWK...........',
  '..........KWWWWWWWWWK...........',
  '..........KWWWWWWWWWK...........',
  '..........KKKKKKKKKKK...........',
  '................................',
];

const MARK = [
  '................................',
  '..........KKKKKKKKKKK...........',
  '.........KKKKKKKKKKKKK..........',
  '.........KKKYYYYYYYKKK..........',
  '.........KKYYKKKKKYYKK..........',
  '.........KKYYKKKKKKKKK..........',
  '.........KKYYKKKKKYYKK..........',
  '.........KKKYYYYYYYKKK..........',
  '.........KKKKKKKKKKKKK..........',
  '..........KKKKKKKKKKK...........',
  '................................',
];

// DO NOT replace existing keys — they match the physical arcade cabinet wiring.
const CABINET_KEYS = {
  P1_U: ['w'],
  P1_D: ['s'],
  P1_L: ['a'],
  P1_R: ['d'],
  P1_1: ['u'],
  P1_2: ['i'],
  P1_3: ['o'],
  P1_4: ['j'],
  P1_5: ['k'],
  P1_6: ['l'],
  P2_U: ['ArrowUp'],
  P2_D: ['ArrowDown'],
  P2_L: ['ArrowLeft'],
  P2_R: ['ArrowRight'],
  P2_1: ['r'],
  P2_2: ['t'],
  P2_3: ['y'],
  P2_4: ['f'],
  P2_5: ['g'],
  P2_6: ['h'],
  START1: ['Enter'],
  START2: ['2'],
};

const KEYBOARD_TO_ARCADE = {};
for (const [arcadeCode, keys] of Object.entries(CABINET_KEYS)) {
  for (const key of keys) KEYBOARD_TO_ARCADE[normalizeKey(key)] = arcadeCode;
}

const config = {
  type: Phaser.AUTO,
  width: W,
  height: H,
  parent: 'game-root',
  backgroundColor: '#07110c',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: { preload, create, update },
};

new Phaser.Game(config);

function paint(scene, key, rows) {
  const g = scene.add.graphics();
  const height = rows.length;
  const width = rows.reduce((max, row) => Math.max(max, row.length), 0);
  for (let y = 0; y < height; y += 1) {
    const line = rows[y].padEnd(width, '.');
    for (let x = 0; x < width; x += 1) {
      const color = PAL[line[x]];
      if (color === undefined) continue;
      g.fillStyle(color, 1);
      g.fillRect(x * PX, y * PX, PX, PX);
    }
  }
  g.generateTexture(key, width * PX, height * PX);
  g.destroy();
}

function preload() {
  this.load.image('boss', BOSS);
  this.load.image('hero', HERO);
  this.load.image('sky', SKY);
}

function create() {
  const scene = this;
  currentScene = scene;
  ['boss', 'hero', 'sky'].forEach((k) => {
    scene.textures.get(k).setFilter(Phaser.Textures.FilterMode.NEAREST);
  });
  paint(scene, 'yummy', YUM);
  paint(scene, 'bag', BAG);
  paint(scene, 'mark', MARK);

  scene.scores = [];
  scene.want = { x: 0, y: 0 };
  scene.slots = ['A', 'A', 'A'];
  scene.slot = 0;
  scene.level = 1;
  scene.score = 0;
  scene.cuotas = 3;
  scene.live = 0;

  drawSkyline(scene);
  const frame = scene.add.graphics().setDepth(12);
  frame.lineStyle(4, 0xd6ff00, 1);
  frame.strokeRect(8, 8, W - 16, H - 16);

  scene.player = makeActor(scene, 'hero', 6, 0.88);
  scene.ghost = makeActor(scene, 'boss', 5, 0.88);
  scene.ghost.flip = false;
  scene.yummy = makeActor(scene, 'yummy', 5, 0.5);
  scene.player.spr.setScale(0.5);
  scene.ghost.spr.setScale(0.55);
  scene.yummy.spr.setScale(0.92);

  buildHud(scene);
  buildTitle(scene);
  buildOverlay(scene);
  bindControls(scene);
  showTitle(scene);

  loadScores().then((rows) => {
    scene.scores = rows;
    refreshHud(scene);
    refreshBoard(scene);
  });
}

function update(_, delta) {
  const scene = this;
  const dt = Math.min(delta, 34);
  if (scene.mode === 'title') {
    cycleTitle(scene, dt);
    if (consume(scene, ['START1', 'START2', 'P1_1', 'P2_1'])) startRun(scene);
    return;
  }
  if (scene.mode === 'pause') {
    if (consume(scene, ['START1', 'START2'])) {
      scene.overlay.setVisible(false);
      scene.mode = 'play';
      clearPressed(scene);
    }
    return;
  }
  if (scene.mode === 'cashea') {
    if (consume(scene, ['START1', 'START2'])) revive(scene);
    else if (consume(scene, ['P1_1', 'P2_1'])) finishRun(scene);
    return;
  }
  if (scene.mode === 'name') {
    editName(scene);
    return;
  }
  if (scene.mode === 'done') {
    if (consume(scene, ['START1', 'START2', 'P1_1', 'P2_1'])) showTitle(scene);
    return;
  }
  stepPlay(scene, dt);
}

function makeActor(scene, key, depth, feet) {
  const spr = scene.add.image(0, 0, key).setDepth(depth).setOrigin(0.5, feet);
  return { spr, c: 1, r: 1, x: 0, y: 0, dx: 0, dy: 0, ateC: -1, ateR: -1, alive: true, flip: true };
}

function drawSkyline(scene) {
  scene.add.image(W / 2, 52, 'sky').setDisplaySize(W - 16, 88).setDepth(0);
  scene.add
    .text(W / 2, H - 18, 'CARACAS ARCADE 2026', {
      fontFamily: 'monospace', fontSize: '18px', color: '#39ff14', fontStyle: 'bold',
    })
    .setOrigin(0.5)
    .setDepth(4);
}

function buildHud(scene) {
  scene.add.rectangle(W / 2, 36, 250, 22, 0xe1ff00).setDepth(10);
  scene.add
    .text(W / 2, 36, 'CAFÉS EVITADOS', {
      fontFamily: 'monospace', fontSize: '14px', color: '#14200a', fontStyle: 'bold',
    })
    .setOrigin(0.5)
    .setDepth(11);
  scene.scoreText = scene.add
    .text(24, 14, '00000', {
      fontFamily: 'monospace', fontSize: '28px', color: '#e1ff00', fontStyle: 'bold',
    })
    .setDepth(11);
  scene.recText = scene.add
    .text(24, 46, 'RÉCORD 00000', {
      fontFamily: 'monospace', fontSize: '13px', color: '#b7c48a',
    })
    .setDepth(11);
  scene.cuotaText = scene.add
    .text(W - 20, 16, 'CUOTAS 3/3', {
      fontFamily: 'monospace', fontSize: '16px', color: '#ffe14a', fontStyle: 'bold',
    })
    .setOrigin(1, 0)
    .setDepth(11);
  scene.mapText = scene.add
    .text(W - 20, 40, 'MAPA #0000', {
      fontFamily: 'monospace', fontSize: '13px', color: '#9ad7ff',
    })
    .setOrigin(1, 0)
    .setDepth(11);
  scene.stateText = scene.add
    .text(W / 2, 58, '', {
      fontFamily: 'monospace', fontSize: '12px', color: '#39ff14',
    })
    .setOrigin(0.5, 0)
    .setDepth(11);
}

function buildTitle(scene) {
  const c = scene.add.container(0, 0).setDepth(20);
  scene.titleUi = c;
  c.add(scene.add.rectangle(W / 2, 340, W - 36, 470, 0x07110c, 0.9));
  scene.hero = scene.add.image(148, 468, 'boss').setScale(1.35).setOrigin(0.5, 0.88);
  scene.runner = scene.add.image(640, 468, 'hero').setScale(1.25).setOrigin(0.5, 0.88);
  c.add(scene.hero);
  c.add(scene.runner);
  c.add(scene.add.image(390, 500, 'bag').setScale(1.7));
  c.add(scene.add.image(480, 500, 'mark').setScale(1.35));
  c.add(scene.add.image(575, 512, 'yummy').setScale(1.35));
  c.add(
    scene.add.text(W / 2, 100, 'ESCÁPATE DEL', {
      fontFamily: 'monospace', fontSize: '16px', color: '#b7c48a',
    }).setOrigin(0.5),
  );
  const title = scene.add.text(W / 2, 138, 'MANGUANGUAS', {
    fontFamily: 'monospace', fontSize: '46px', color: '#e1ff00', fontStyle: 'bold',
  }).setOrigin(0.5);
  c.add(title);
  scene.tweens.add({ targets: title, scale: 1.04, duration: 800, yoyo: true, repeat: -1 });
  c.add(
    scene.add.text(W / 2, 188, 'LABERINTO DE CARACAS', {
      fontFamily: 'monospace', fontSize: '16px', color: '#f7f4ea',
    }).setOrigin(0.5),
  );
  scene.faceLabel = scene.add.text(W / 2, 214, '', {
    fontFamily: 'monospace', fontSize: '13px', color: '#9ad7ff',
  }).setOrigin(0.5);
  c.add(scene.faceLabel);
  c.add(
    scene.add.text(W / 2, 250, 'MONTALBÁN asusta al jefe y te acelera\nYUMMY recorre la avenida\nCASHEA te revive, máximo 3 cuotas\nCADA MAPA SALE DE UN RANDOM', {
      fontFamily: 'monospace', fontSize: '14px', color: '#d6ff7a', align: 'center', lineSpacing: 6,
    }).setOrigin(0.5, 0),
  );
  scene.board = scene.add.text(W / 2, 360, '', {
    fontFamily: 'monospace', fontSize: '14px', color: '#f7f4ea', align: 'center', lineSpacing: 4,
  }).setOrigin(0.5, 0);
  c.add(scene.board);
  c.add(
    scene.add.text(W / 2, 548, 'PALANCA MOVER    START / ENTER JUGAR', {
      fontFamily: 'monospace', fontSize: '13px', color: '#8ea06a',
    }).setOrigin(0.5),
  );
}

function buildOverlay(scene) {
  const c = scene.add.container(0, 0).setDepth(30).setVisible(false);
  scene.overlay = c;
  scene.dim = scene.add.rectangle(W / 2, H / 2, W, H, 0x000000, 1);
  scene.overlayTitle = scene.add.text(W / 2, 168, '', {
    fontFamily: 'monospace', fontSize: '26px', color: '#39ff14', align: 'center', fontStyle: 'bold',
    wordWrap: { width: 740 },
  }).setOrigin(0.5);
  scene.overlayBody = scene.add.text(W / 2, 268, '', {
    fontFamily: 'monospace', fontSize: '18px', color: '#b6ff8a', align: 'center', lineSpacing: 8,
    wordWrap: { width: 740 },
  }).setOrigin(0.5);
  scene.nameText = scene.add.text(W / 2, 360, '', {
    fontFamily: 'monospace', fontSize: '40px', color: '#e1ff00', fontStyle: 'bold',
  }).setOrigin(0.5);
  scene.overlayHelp = scene.add.text(W / 2, 470, '', {
    fontFamily: 'monospace', fontSize: '14px', color: '#8ea06a', align: 'center',
  }).setOrigin(0.5);
  c.add([scene.dim, scene.overlayTitle, scene.overlayBody, scene.nameText, scene.overlayHelp]);
}

function showTitle(scene) {
  scene.mode = 'title';
  scene.level = 1;
  scene.score = 0;
  scene.cuotas = 3;
  scene.tax = 0;
  scene.power = 0;
  scene.faceT = 0;
  bootLevel(scene, true);
  scene.titleUi.setVisible(true);
  scene.overlay.setVisible(false);
  refreshHud(scene);
  refreshBoard(scene);
  clearPressed(scene);
}

function startRun(scene) {
  tone(scene, 440, 880, 0.12, 'square', 0.08);
  scene.mode = 'play';
  scene.level = 1;
  scene.score = 0;
  scene.cuotas = 3;
  scene.tax = 0;
  scene.power = 0;
  scene.iframe = 1600;
  scene.live = 0;
  scene.titleUi.setVisible(false);
  scene.overlay.setVisible(false);
  bootLevel(scene, true);
  clearPressed(scene);
  refreshHud(scene);
}

function bootLevel(scene, fresh) {
  if (fresh) scene.seed = 1000 + Math.floor(Math.random() * 9000);
  const rnd = mulberry32(scene.seed);
  scene.grid = carveMaze(rnd);
  if (scene.world) scene.world.destroy();
  scene.world = scene.add.container(0, 0).setDepth(1);
  scene.pickups = [];
  scene.beans = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  scene.left = 0;
  drawQuarter(scene, rnd);
  const start = findStart(scene.grid);
  place(scene.player, start.c, start.r);
  place(scene.ghost, MID_C, MID_R);
  scene.ghost.alive = true;
  scene.ghost.wait = 0;
  scene.ghost.spr.setVisible(true).clearTint();
  scene.ghost.spr.setTexture('boss');
  scene.player.spr.clearTint().setVisible(true);
  const y = cellY(MID_R);
  place(scene.yummy, 2, MID_R);
  scene.yummy.y = y;
  scene.yummy.spr.setPosition(scene.yummy.x, y);
  scene.yummy.dx = 1;
  scene.yummy.spr.setVisible(true);
  scatter(scene, rnd, start);
  scene.pSpeed = Math.min(168, 112 * 1.05 ** (scene.level - 1));
  scene.gSpeed = Math.min(150, 90 * 1.05 ** (scene.level - 1));
  scene.ySpeed = Math.min(210, 150 * 1.04 ** (scene.level - 1));
  refreshHud(scene);
}

function carveMaze(rnd) {
  const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(1));
  const stack = [[1, 1]];
  grid[1][1] = 0;
  while (stack.length) {
    const [x, y] = stack[stack.length - 1];
    const options = [];
    for (const dir of DIRS) {
      const nx = x + dir.x * 2;
      const ny = y + dir.y * 2;
      if (nx > 0 && ny > 0 && nx < COLS - 1 && ny < ROWS - 1 && grid[ny][nx] === 1) {
        options.push([nx, ny, x + dir.x, y + dir.y]);
      }
    }
    if (!options.length) {
      stack.pop();
      continue;
    }
    const pick = options[Math.floor(rnd() * options.length)];
    grid[pick[3]][pick[2]] = 0;
    grid[pick[1]][pick[0]] = 0;
    stack.push([pick[0], pick[1]]);
  }
  for (let x = 1; x < COLS - 1; x += 1) grid[MID_R][x] = 0;
  for (let y = 1; y < ROWS - 1; y += 1) grid[y][MID_C] = 0;
  for (let i = 0; i < 18; i += 1) {
    const c = 1 + Math.floor(rnd() * (COLS - 2));
    const r = 1 + Math.floor(rnd() * (ROWS - 2));
    if (grid[r][c] === 1) grid[r][c] = 0;
  }
  for (let x = 0; x < COLS; x += 1) {
    grid[0][x] = 1;
    grid[ROWS - 1][x] = 1;
  }
  for (let y = 0; y < ROWS; y += 1) {
    grid[y][0] = 1;
    grid[y][COLS - 1] = 1;
  }
  return grid;
}

function drawQuarter(scene, rnd) {
  const g = scene.add.graphics();
  scene.world.add(g);
  for (let i = 0; i < 8; i += 1) {
    const x = i < 4 ? 6 + Math.floor(rnd() * 8) : W - 40 - Math.floor(rnd() * 8);
    const y = 130 + i * 48;
    drawHouse(g, x, y, rnd() < 0.5 ? 0x8d3a2c : 0xb5652e);
  }
  for (let r = 1; r < ROWS - 1; r += 1) {
    for (let c = 1; c < COLS - 1; c += 1) {
      if (scene.grid[r][c] === 1 && rnd() < 0.34) drawTower(g, c, r, rnd);
    }
  }
  for (let r = 1; r < ROWS - 1; r += 1) {
    for (let c = 1; c < COLS - 1; c += 1) {
      if (scene.grid[r][c] === 0) drawRoad(g, c, r);
    }
  }
  scene.dotGfx = scene.add.graphics().setDepth(2);
  scene.world.add(scene.dotGfx);
  const tags = ['cashea', 'yummy', 'cashea', 'yummy'];
  for (let i = tags.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rnd() * (i + 1));
    const swap = tags[i];
    tags[i] = tags[j];
    tags[j] = swap;
  }
  const spots = [
    [OX + 8, OY + 8],
    [OX + COLS * TILE - 78, OY + 8],
    [OX + 8, OY + ROWS * TILE - 22],
    [OX + COLS * TILE - 78, OY + ROWS * TILE - 22],
  ];
  spots.forEach((spot, index) => {
    const label = scene.add.text(spot[0], spot[1], tags[index], {
      fontFamily: 'monospace',
      fontSize: '11px',
      color: tags[index] === 'yummy' ? '#d7b6ff' : '#ffe14a',
      fontStyle: 'bold',
    }).setDepth(3);
    scene.world.add(label);
  });
}

function drawHouse(g, x, y) {
  g.fillStyle(0xa63a24, 1);
  g.fillRect(x, y, 32, 24);
  g.fillStyle(0x5e190a, 1);
  g.fillRect(x, y + 8, 32, 2);
  g.fillRect(x, y + 16, 32, 2);
  g.fillRect(x + 14, y, 2, 24);
  g.fillStyle(0x8fa3b3, 1);
  g.fillTriangle(x - 4, y, x + 16, y - 8, x + 36, y);
  const luz = Math.random() > 0.4 ? 0xffe14a : 0x222222;
  g.fillStyle(luz, 1);
  g.fillRect(x + 6, y + 10, 6, 6);
  g.fillRect(x + 20, y + 10, 6, 6);
}

function drawTower(g, c, r) {
  const x = OX + c * TILE;
  const y = OY + r * TILE;
  const top = y - 30;
  g.fillStyle(0x4a5a6b, 1);
  g.fillRect(x + 6, top, TILE - 12, y + TILE - top);
  g.lineStyle(2, 0x1636a8, 1);
  g.strokeRect(x + 6, top, TILE - 12, y + TILE - top);
  g.fillStyle(0x9ad7ff, 0.6);
  for (let floor = top + 6; floor < y + TILE - 6; floor += 8) {
    g.fillRect(x + 10, floor, 4, 4);
    g.fillRect(x + 18, floor, 4, 4);
  }
}

function drawRoad(g, c, r) {
  const x = OX + c * TILE;
  const y = OY + r * TILE;
  const avenue = c === MID_C || r === MID_R;
  const pad = 4;
  g.fillStyle(0x000000, 1);
  g.fillRect(x, y, TILE, TILE);
  g.lineStyle(2, 0x1636a8, 1);
  if (!isOpen(c, r - 1)) {
    g.beginPath();
    g.moveTo(x, y + pad);
    g.lineTo(x + TILE, y + pad);
    g.strokePath();
  }
  if (!isOpen(c, r + 1)) {
    g.beginPath();
    g.moveTo(x, y + TILE - pad);
    g.lineTo(x + TILE, y + TILE - pad);
    g.strokePath();
  }
  if (!isOpen(c - 1, r)) {
    g.beginPath();
    g.moveTo(x + pad, y);
    g.lineTo(x + pad, y + TILE);
    g.strokePath();
  }
  if (!isOpen(c + 1, r)) {
    g.beginPath();
    g.moveTo(x + TILE - pad, y);
    g.lineTo(x + TILE - pad, y + TILE);
    g.strokePath();
  }
  if (avenue) {
    g.fillStyle(0xffd000, 1);
    if (r === MID_R) g.fillRect(x + 6, y + TILE / 2 - 2, TILE - 12, 4);
    if (c === MID_C) g.fillRect(x + TILE / 2 - 2, y + 6, 4, TILE - 12);
  } else {
    g.fillStyle(0x9ad7ff, 0.15);
    g.fillRect(x + TILE / 2 - 1, y + TILE / 2 - 1, 2, 2);
  }
}

function scatter(scene, rnd, start) {
  const spots = [];
  for (let r = 1; r < ROWS - 1; r += 1) {
    for (let c = 1; c < COLS - 1; c += 1) {
      if (scene.grid[r][c] !== 0) continue;
      if ((c === start.c && r === start.r) || (c === MID_C && r === MID_R)) continue;
      spots.push({ c, r });
    }
  }
  const bags = [];
  const corners = [
    [2, 2],
    [COLS - 3, 2],
    [2, ROWS - 3],
    [COLS - 3, ROWS - 3],
  ];
  for (const [c, r] of corners) {
    const cell = nearestOpen(scene, c, r);
    if (bags.length < 3 && !bags.some((b) => b.c === cell.c && b.r === cell.r)) bags.push(cell);
  }
  let cash = null;
  for (let i = spots.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rnd() * (i + 1));
    const swap = spots[i];
    spots[i] = spots[j];
    spots[j] = swap;
  }
  for (const spot of spots) {
    if (!cash && rnd() < 0.08) {
      cash = spot;
      continue;
    }
    scene.beans[spot.r][spot.c] = 1;
    scene.left += 1;
  }
  for (const bag of bags) {
    if (scene.beans[bag.r][bag.c]) {
      scene.beans[bag.r][bag.c] = 0;
      scene.left -= 1;
    }
    dropItem(scene, bag.c, bag.r, 'bag');
  }
  if (cash) {
    if (scene.beans[cash.r][cash.c]) {
      scene.beans[cash.r][cash.c] = 0;
      scene.left -= 1;
    }
    dropItem(scene, cash.c, cash.r, 'mark');
  }
  redrawBeans(scene);
}

function dropItem(scene, c, r, key) {
  const item = scene.add.image(cellX(c), cellY(r), key).setDepth(3);
  if (key === 'bag') item.setScale(0.62);
  if (key === 'mark') item.setScale(0.5);
  scene.world.add(item);
  item.c = c;
  item.r = r;
  item.kind = key;
  scene.pickups.push(item);
}

function redrawBeans(scene) {
  const g = scene.dotGfx;
  if (!g || !g.active) return;
  g.clear();
  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      if (!scene.beans[r][c]) continue;
      const x = cellX(c);
      const y = cellY(r);
      g.fillStyle(0x4a2912, 1);
      g.fillCircle(x, y, 4);
      g.fillStyle(0xf3e2c4, 1);
      g.fillCircle(x - 1, y - 1, 1.5);
    }
  }
}

function stepPlay(scene, dt) {
  if (consume(scene, ['START1', 'START2'])) {
    scene.mode = 'pause';
    halt(scene);
    openOverlay(scene, 'PAUSA', 'La avenida puede esperar.', '', 'START PARA SEGUIR', 0.78);
    return;
  }
  scene.live += dt;
  scene.tax = Math.max(0, scene.tax - dt);
  scene.power = Math.max(0, scene.power - dt);
  scene.iframe = Math.max(0, scene.iframe - dt);
  if (scene.ghost.wait > 0) {
    scene.ghost.wait -= dt;
    if (scene.ghost.wait <= 0) respawnGhost(scene);
  }
  pollStick(scene);
  roll(scene, scene.player, dt, scene.power > 0 ? scene.pSpeed * 1.35 : scene.pSpeed, choosePlayer);
  if (scene.ghost.alive) roll(scene, scene.ghost, dt, scene.power > 0 ? scene.gSpeed * 0.72 : scene.gSpeed, chooseGhost);
  moveYummy(scene, dt);
  faces(scene);
  collide(scene);
  refreshHud(scene);
}

function roll(scene, actor, dt, speed, dirFn) {
  if (actor.dx === 0 && actor.dy === 0) {
    actor.x = cellX(actor.c);
    actor.y = cellY(actor.r);
  }
  const step = Math.min(TILE * 0.45, (speed * dt) / 1000);
  const cx = cellX(actor.c);
  const cy = cellY(actor.r);
  const dist = Math.hypot(actor.x - cx, actor.y - cy);
  const toward = actor.dx * (cx - actor.x) + actor.dy * (cy - actor.y);
  if (dist <= step && (toward >= -0.01 || (actor.dx === 0 && actor.dy === 0))) {
    actor.x = cx;
    actor.y = cy;
    let next = dirFn(scene, actor.c, actor.r);
    if (!next) next = { x: actor.dx, y: actor.dy };
    if ((next.x || next.y) && isOpen(actor.c + next.x, actor.r + next.y)) {
      actor.dx = next.x;
      actor.dy = next.y;
    } else if (!isOpen(actor.c + actor.dx, actor.r + actor.dy)) {
      actor.dx = 0;
      actor.dy = 0;
    }
    if (actor === scene.player && (actor.ateC !== actor.c || actor.ateR !== actor.r)) {
      actor.ateC = actor.c;
      actor.ateR = actor.r;
      const seed = scene.seed;
      eat(scene);
      if (scene.seed !== seed || scene.mode !== 'play') return;
    }
  }
  actor.x += actor.dx * step;
  actor.y += actor.dy * step;
  const nc = Math.round((actor.x - OX - TILE / 2) / TILE);
  const nr = Math.round((actor.y - OY - TILE / 2) / TILE);
  if (isOpen(nc, nr)) {
    actor.c = nc;
    actor.r = nr;
  } else {
    actor.x = cellX(actor.c);
    actor.y = cellY(actor.r);
    actor.dx = 0;
    actor.dy = 0;
  }
  actor.spr.setPosition(actor.x, actor.y);
  if (actor.flip && actor.dx) actor.spr.setFlipX(actor.dx < 0);
}

function choosePlayer(scene, c, r) {
  const want = scene.want;
  if ((want.x || want.y) && isOpen(c + want.x, r + want.y)) return want;
  return null;
}

function chooseGhost(scene, c, r) {
  if (Math.random() < 0.16) {
    const options = DIRS.filter((dir) => isOpen(c + dir.x, r + dir.y));
    if (options.length) return options[Math.floor(Math.random() * options.length)];
  }
  return bfsDir(scene, c, r, scene.player.c, scene.player.r, scene.power > 0);
}

function bfsDir(scene, c, r, tc, tr, flee) {
  if (flee) {
    const corners = [
      [1, 1],
      [COLS - 2, 1],
      [1, ROWS - 2],
      [COLS - 2, ROWS - 2],
    ];
    let best = corners[0];
    let bestDist = -1;
    for (const corner of corners) {
      const dist = Math.abs(corner[0] - tc) + Math.abs(corner[1] - tr);
      if (dist > bestDist) {
        bestDist = dist;
        best = corner;
      }
    }
    const near = nearestOpen(scene, best[0], best[1]);
    tc = near.c;
    tr = near.r;
  }
  const queue = [[c, r]];
  const prev = new Map();
  prev.set(`${c},${r}`, null);
  let found = null;
  while (queue.length) {
    const [x, y] = queue.shift();
    if (x === tc && y === tr) {
      found = [x, y];
      break;
    }
    for (const dir of DIRS) {
      const nx = x + dir.x;
      const ny = y + dir.y;
      const key = `${nx},${ny}`;
      if (!isOpen(nx, ny) || prev.has(key)) continue;
      prev.set(key, [x, y]);
      queue.push([nx, ny]);
    }
  }
  if (!found) {
    const options = DIRS.filter((dir) => isOpen(c + dir.x, r + dir.y));
    return options[0] || { x: 0, y: 0 };
  }
  let cur = found;
  let parent = prev.get(`${cur[0]},${cur[1]}`);
  while (parent && !(parent[0] === c && parent[1] === r)) {
    cur = parent;
    parent = prev.get(`${cur[0]},${cur[1]}`);
  }
  return { x: cur[0] - c, y: cur[1] - r };
}

function moveYummy(scene, dt) {
  const rider = scene.yummy;
  rider.x += rider.dx * ((scene.ySpeed * dt) / 1000);
  const min = cellX(1);
  const max = cellX(COLS - 2);
  if (rider.x < min) {
    rider.x = min;
    rider.dx = 1;
  }
  if (rider.x > max) {
    rider.x = max;
    rider.dx = -1;
  }
  rider.spr.setPosition(rider.x, cellY(MID_R));
  rider.spr.setFlipX(rider.dx < 0);
}

function eat(scene) {
  const { c, r } = scene.player;
  if (scene.beans[r] && scene.beans[r][c]) {
    scene.beans[r][c] = 0;
    scene.left -= 1;
    addScore(scene, 10);
    redrawBeans(scene);
    blip(scene);
    if (scene.left <= 0) {
      nextLevel(scene);
      return;
    }
  }
  for (const item of scene.pickups) {
    if (!item.active || item.c !== c || item.r !== r) continue;
    item.destroy();
    if (item.kind === 'bag') {
      scene.power = 7000;
      addScore(scene, 50);
      floater(scene, item.x, item.y, 'MONTALBÁN', '#f4f1e8');
      tone(scene, 520, 1040, 0.12, 'square', 0.08);
    } else {
      scene.cuotas = Math.min(3, scene.cuotas + 1);
      floater(scene, item.x, item.y, 'CUOTA', '#ffe14a');
      tone(scene, 660, 990, 0.1, 'square', 0.08);
    }
  }
}

function collide(scene) {
  if (scene.mode !== 'play' || scene.iframe > 0) return;
  const px = scene.player.spr.x;
  const py = scene.player.spr.y;
  if (scene.ghost.alive && Math.hypot(px - scene.ghost.spr.x, py - scene.ghost.spr.y) < 16) {
    if (scene.power > 0) eatGhost(scene);
    else caught(scene);
    return;
  }
  if (Math.abs(py - cellY(MID_R)) < 16 && Math.abs(px - scene.yummy.spr.x) < 16) caught(scene);
}

function eatGhost(scene) {
  scene.ghost.alive = false;
  scene.ghost.wait = 2800;
  scene.ghost.dx = 0;
  scene.ghost.dy = 0;
  scene.ghost.spr.setVisible(false);
  addScore(scene, 200);
  floater(scene, scene.ghost.spr.x, scene.ghost.spr.y, '+200', '#e1ff00');
  tone(scene, 200, 880, 0.16, 'square', 0.1);
}

function respawnGhost(scene) {
  place(scene.ghost, MID_C, MID_R);
  scene.ghost.alive = true;
  scene.ghost.spr.setVisible(true).clearTint();
}

function caught(scene) {
  if (scene.mode !== 'play') return;
  halt(scene);
  scene.player.spr.setTint(0xff8a8a);
  scene.ghost.spr.setTint(0xff5a5a);
  scene.cameras.main.shake(180, 0.01);
  burstNoise(scene);
  if (scene.cuotas > 0) {
    scene.mode = 'cashea';
    openOverlay(
      scene,
      'QUE MANGUANGUA VALE!!',
      `¿Revivir con Cashea?\nCUOTAS ${scene.cuotas}/3`,
      '',
      'START REVIVE    BOTÓN 1 SE RINDE',
      1,
    );
    return;
  }
  finishRun(scene);
}

function revive(scene) {
  scene.cuotas -= 1;
  scene.tax = 15000;
  scene.power = 0;
  scene.iframe = 1800;
  const start = findStart(scene.grid);
  place(scene.player, start.c, start.r);
  place(scene.ghost, MID_C, MID_R);
  scene.ghost.alive = true;
  scene.ghost.wait = 0;
  scene.ghost.spr.setVisible(true).clearTint();
  scene.yummy.x = cellX(2);
  scene.yummy.dx = 1;
  clearNear(scene, start.c, start.r);
  const ring = scene.add.circle(scene.player.x, scene.player.y, 10).setStrokeStyle(3, 0x39ff14).setDepth(8);
  scene.tweens.add({
    targets: ring, scale: 8, alpha: 0, duration: 380, onComplete: () => ring.destroy(),
  });
  scene.overlay.setVisible(false);
  scene.mode = 'play';
  clearPressed(scene);
  tone(scene, 220, 880, 0.16, 'square', 0.09);
  refreshHud(scene);
}

function clearNear(scene, c, r) {
  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLS; x += 1) {
      if (Math.abs(x - c) + Math.abs(y - r) <= 2 && scene.beans[y][x]) {
        scene.beans[y][x] = 0;
        scene.left -= 1;
      }
    }
  }
  redrawBeans(scene);
  if (scene.left <= 0) nextLevel(scene);
}

function nextLevel(scene) {
  scene.level += 1;
  scene.iframe = 1200;
  scene.power = 0;
  floater(scene, W / 2, H / 2, `MAPA NUEVO  NIVEL ${scene.level}`, '#e1ff00');
  tone(scene, 440, 880, 0.14, 'square', 0.08);
  bootLevel(scene, true);
}

function halt(scene) {
  scene.player.dx = 0;
  scene.player.dy = 0;
  scene.ghost.dx = 0;
  scene.ghost.dy = 0;
}

function faces(scene) {
  const dist = Math.abs(scene.player.c - scene.ghost.c) + Math.abs(scene.player.r - scene.ghost.r);
  if (scene.power > 0) scene.player.spr.setTint(0xffe566);
  else if (dist < 4 && scene.ghost.alive) scene.player.spr.setTint(0xff8a8a);
  else scene.player.spr.clearTint();
  if (!scene.ghost.alive || scene.power > 0) scene.ghost.spr.setTint(0xb9d4ff);
  else if (dist < 5) scene.ghost.spr.setTint(0xff5a5a);
  else scene.ghost.spr.clearTint();
}

function cycleTitle(scene, dt) {
  scene.faceT += dt;
  const frame = Math.floor(scene.faceT / 650) % 4;
  const tints = [0xffffff, 0xff5a5a, 0xb9d4ff, 0xffffff];
  const ptints = [0xffffff, 0xffffff, 0xff8a8a, 0xffe566];
  const names = ['CORRE', 'CORRE', 'MIEDO', 'ALEGRÍA'];
  scene.runner.setTint(ptints[frame]);
  scene.hero.setTint(tints[frame]);
  scene.faceLabel.setText(names[frame]);
}

function findStart(grid) {
  for (let r = ROWS - 2; r > 1; r -= 1) {
    for (let c = 1; c < COLS - 1; c += 1) {
      if (grid[r][c] === 0 && Math.abs(c - MID_C) > 3 && r !== MID_R) return { c, r };
    }
  }
  return { c: 1, r: ROWS - 2 };
}

function nearestOpen(scene, c, r) {
  if (isOpen(c, r)) return { c, r };
  for (let radius = 1; radius < COLS; radius += 1) {
    for (let y = r - radius; y <= r + radius; y += 1) {
      for (let x = c - radius; x <= c + radius; x += 1) {
        if (isOpen(x, y)) return { c: x, r: y };
      }
    }
  }
  return { c: 1, r: 1 };
}

function place(actor, c, r) {
  actor.c = c;
  actor.r = r;
  actor.x = cellX(c);
  actor.y = cellY(r);
  actor.dx = 0;
  actor.dy = 0;
  actor.ateC = -1;
  actor.ateR = -1;
  actor.spr.setPosition(actor.x, actor.y);
}

function cellX(c) {
  return OX + c * TILE + TILE / 2;
}

function cellY(r) {
  return OY + r * TILE + TILE / 2;
}

function isOpen(c, r) {
  const scene = currentScene;
  if (!scene || !scene.grid) return false;
  return r > 0 && c > 0 && r < ROWS - 1 && c < COLS - 1 && scene.grid[r][c] === 0;
}

let currentScene = null;

function pollStick(scene) {
  let x = 0;
  let y = 0;
  if (down(scene, 'P1_L') || down(scene, 'P2_L')) x -= 1;
  if (down(scene, 'P1_R') || down(scene, 'P2_R')) x += 1;
  if (down(scene, 'P1_U') || down(scene, 'P2_U')) y -= 1;
  if (down(scene, 'P1_D') || down(scene, 'P2_D')) y += 1;
  x = Math.sign(x);
  y = Math.sign(y);
  if (x && y) {
    if (scene.want.x) y = 0;
    else x = 0;
  }
  if (x || y) scene.want = { x, y };
}

function addScore(scene, amount) {
  scene.score += scene.tax > 0 ? Math.ceil(amount / 2) : amount;
}

function refreshHud(scene) {
  scene.scoreText.setText(String(scene.score).padStart(5, '0'));
  const best = scene.scores[0] ? scene.scores[0].score : 0;
  scene.recText.setText(`RÉCORD ${String(best).padStart(5, '0')}`);
  scene.cuotaText.setText(`CUOTAS ${scene.cuotas}/3`);
  scene.mapText.setText(`MAPA #${scene.seed || 0}  N${scene.level}`);
  const bits = [];
  if (scene.tax > 0) bits.push(`CUOTA ×½ ${Math.ceil(scene.tax / 1000)}s`);
  if (scene.power > 0) bits.push(`MONTALBÁN ${(scene.power / 1000).toFixed(1)}s`);
  scene.stateText.setText(bits.join('   '));
}

function refreshBoard(scene) {
  if (!scene.board) return;
  const lines = scene.scores.length
    ? scene.scores.map((row, i) => `${i + 1}  ${row.name}   ${String(row.score).padStart(5, '0')}`)
    : ['AÚN NO HAY RÉCORD'];
  scene.board.setText(lines.join('\n'));
}

function finishRun(scene) {
  if (scene.mode === 'name' || scene.mode === 'done') return;
  const fromPlay = scene.mode === 'play';
  scene.mode = 'name';
  halt(scene);
  if (fromPlay) burstNoise(scene);
  scene.slot = 0;
  scene.slots = ['A', 'A', 'A'];
  scene.saving = false;
  openOverlay(
    scene,
    'QUE MANGUANGUA VALE!!',
    `${scene.score} cafés evitados`,
    previewName(scene),
    'PALANCA ELIGE    BOTÓN 1 / START GUARDA',
    1,
  );
}

function editName(scene) {
  const stick = readAxis(scene);
  if (!scene.nameLock && (stick.x || stick.y)) {
    if (stick.x) scene.slot = Phaser.Math.Wrap(scene.slot + stick.x, 0, 3);
    if (stick.y) {
      const code = scene.slots[scene.slot].charCodeAt(0);
      scene.slots[scene.slot] = String.fromCharCode(Phaser.Math.Wrap(code - 65 - stick.y, 0, 26) + 65);
    }
    scene.nameText.setText(previewName(scene));
    scene.nameLock = true;
    scene.time.delayedCall(150, () => {
      scene.nameLock = false;
    });
  }
  if (!stick.x && !stick.y) scene.nameLock = false;
  if (consume(scene, ['P1_1', 'P2_1', 'START1', 'START2'])) saveRun(scene);
}

function previewName(scene) {
  return scene.slots.map((ch, i) => (i === scene.slot ? `[${ch}]` : ` ${ch} `)).join('');
}

function readAxis(scene) {
  let x = 0;
  let y = 0;
  if (down(scene, 'P1_L') || down(scene, 'P2_L')) x -= 1;
  if (down(scene, 'P1_R') || down(scene, 'P2_R')) x += 1;
  if (down(scene, 'P1_U') || down(scene, 'P2_U')) y -= 1;
  if (down(scene, 'P1_D') || down(scene, 'P2_D')) y += 1;
  return { x: Math.sign(x), y: Math.sign(y) };
}

function saveRun(scene) {
  if (scene.saving) return;
  scene.saving = true;
  const entry = {
    name: scene.slots.join(''),
    score: scene.score,
    savedAt: new Date().toISOString().slice(0, 10),
  };
  pushScore(entry)
    .then((rows) => {
      scene.scores = rows;
      scene.mode = 'done';
      openOverlay(scene, 'ANOTADO', `${entry.name}  ${entry.score}`, '', 'START PARA VOLVER', 1);
      refreshBoard(scene);
      refreshHud(scene);
    })
    .catch(() => {
      scene.mode = 'done';
      openOverlay(scene, 'SIN ARCHIVO', 'La partida cuenta igual.', '', 'START PARA VOLVER', 1);
    });
}

function openOverlay(scene, title, body, name, help, alpha) {
  scene.dim.setFillStyle(0x000000, alpha);
  scene.overlayTitle.setText(title);
  scene.overlayBody.setText(body);
  scene.nameText.setText(name);
  scene.overlayHelp.setText(help);
  scene.overlay.setVisible(true);
  clearPressed(scene);
}

function floater(scene, x, y, msg, color) {
  const text = scene.add.text(x, y, msg, {
    fontFamily: 'monospace', fontSize: '16px', color, fontStyle: 'bold',
  }).setOrigin(0.5).setDepth(16);
  scene.tweens.add({
    targets: text, y: y - 24, alpha: 0, duration: 700, onComplete: () => text.destroy(),
  });
}

function bindControls(scene) {
  scene.controls = { held: Object.create(null), pressed: Object.create(null) };
  const onDown = (event) => {
    const code = KEYBOARD_TO_ARCADE[normalizeKey(event.key)];
    if (!code) return;
    event.preventDefault();
    if (!scene.controls.held[code]) scene.controls.pressed[code] = true;
    scene.controls.held[code] = true;
  };
  const onUp = (event) => {
    const code = KEYBOARD_TO_ARCADE[normalizeKey(event.key)];
    if (code) scene.controls.held[code] = false;
  };
  window.addEventListener('keydown', onDown);
  window.addEventListener('keyup', onUp);
  scene.events.once('shutdown', () => {
    window.removeEventListener('keydown', onDown);
    window.removeEventListener('keyup', onUp);
  });
}

function normalizeKey(key) {
  if (typeof key !== 'string' || !key.length) return '';
  return key.toLowerCase();
}

function down(scene, code) {
  return scene.controls.held[code] === true;
}

function consume(scene, codes) {
  for (const code of codes) {
    if (scene.controls.pressed[code]) {
      scene.controls.pressed[code] = false;
      return true;
    }
  }
  return false;
}

function clearPressed(scene) {
  scene.controls.pressed = Object.create(null);
}

function tone(scene, from, to, dur, wave, vol) {
  try {
    const ctx = scene.sound && scene.sound.context;
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = wave;
    osc.frequency.setValueAtTime(Math.max(1, from), now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, to), now + dur);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + dur + 0.02);
  } catch (err) {
    /* sin audio */
  }
}

function blip(scene) {
  if (scene.live < (scene.nextBlip || 0)) return;
  scene.nextBlip = scene.live + 70;
  tone(scene, 760, 540, 0.04, 'square', 0.04);
}

function burstNoise(scene) {
  try {
    const ctx = scene.sound && scene.sound.context;
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const seconds = 0.25;
    const length = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length) * 0.32;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start();
  } catch (err) {
    /* sin audio */
  }
}

function mulberry32(seed) {
  let value = seed >>> 0;
  return function rnd() {
    value |= 0;
    value = (value + 0x6d2b79f5) | 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function storage() {
  if (window.platanusArcadeStorage) return window.platanusArcadeStorage;
  return {
    async get(key) {
      try {
        const raw = window.localStorage.getItem(key);
        return raw === null ? { found: false, value: null } : { found: true, value: JSON.parse(raw) };
      } catch (err) {
        return { found: false, value: null };
      }
    },
    async set(key, value) {
      window.localStorage.setItem(key, JSON.stringify(value));
    },
  };
}

async function loadScores() {
  const result = await storage().get(STORE);
  if (!result.found || !Array.isArray(result.value)) return [];
  return result.value.filter(isScore).slice(0, 5);
}

async function pushScore(entry) {
  const next = (await loadScores()).concat(entry).sort((a, b) => b.score - a.score).slice(0, 5);
  await storage().set(STORE, next);
  return next;
}

function isScore(value) {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.name === 'string' &&
    value.name.length >= 1 &&
    value.name.length <= 3 &&
    typeof value.score === 'number' &&
    value.score >= 0
  );
}
