import type { Language } from '../i18n/translations'

const exactTranslations: Record<string, string> = {
  Encanto: 'Charm',
  '🥚 Amortiguador 🥚': '🥚 Soft-Boiled 🥚',
  'Varias opciones': 'Multiple options',
  Amortiguador: 'Soft-Boiled',
  'Gengar +4': 'Gengar +4',
  'Cambia a Gengar': 'Switch to Gengar',

  'Usa Encanto frente a Aggron. Luego toma una Max Poción y usa Amortiguador para mantener a Chansey sana.': 'Use Charm against Aggron. Then take a Max Potion and use Soft-Boiled to keep Chansey healthy.',
  'Cuando salga Hitmonchan, entra con Gengar y usa Maquinación hasta +4. No es necesario usar Otra Vez.': 'When Hitmonchan comes in, bring in Gengar and use Nasty Plot to +4. Encore is not needed.',
  'Cuando Gengar esté listo, barre con Bola Sombra.': 'When Gengar is ready, sweep with Shadow Ball.',
  'Usa Amortiguador y revisa qué Pokémon entra después.': 'Use Soft-Boiled and check which Pokémon comes in next.',
  'Si entra Machamp, cambia a Gengar y luego a Slowbro. Usa Bostezo, sacrifica a Politoed y entra con Poliwrath para usar Tambor hasta +6 Ataque.': 'If Machamp comes in, switch to Gengar and then to Slowbro. Use Yawn, sacrifice Politoed, and bring in Poliwrath to use Belly Drum and reach +6 Attack.',
  'Si entra Hitmonlee, cambia a Gengar y luego a Slowbro. Si Hitmonlee se queda, usa Bostezo.': 'If Hitmonlee comes in, switch to Gengar and then to Slowbro. If Hitmonlee stays in, use Yawn.',
  'Si entra Electivire, sacrifica a Politoed y entra con Poliwrath para usar Tambor hasta +6 Ataque.': 'If Electivire comes in, sacrifice Politoed and bring in Poliwrath to use Belly Drum and reach +6 Attack.',
  'Si entra Blastoise, entra con Volcarona y usa Danza Aleteo x1.': 'If Blastoise comes in, bring in Volcarona and use Quiver Dance x1.',
  'Si entra Darmanitan, elige una de estas rutas.': 'If Darmanitan comes in, choose one of these routes.',
  'Ruta ahorro: entra con Volcarona y usa Danza Aleteo x3. ⚠️ Cuidado con un Fuerza Bruta crítico: puede dejarte cerca de 51% PS.': 'Budget route: bring in Volcarona and use Quiver Dance x3. ⚠️ Be careful with a critical Superpower: it can leave you near 51% HP.',
  'Ruta RNG: sacrifica a Politoed y entra con Poliwrath para usar Tambor hasta +6 Ataque.': 'RNG route: sacrifice Politoed and bring in Poliwrath to use Belly Drum and reach +6 Attack.',
  'Ruta estable: cambia a Slowbro, usa Bostezo, sacrifica a Politoed y entra con Poliwrath para usar Tambor hasta +6 Ataque.': 'Stable route: switch to Slowbro, use Yawn, sacrifice Politoed, and bring in Poliwrath to use Belly Drum and reach +6 Attack.',
  'Contra Darmanitan tienes tres rutas posibles. Elige según si quieres ahorrar recursos o jugar más estable.': 'Against Darmanitan, you have three possible routes. Choose based on whether you want to save resources or play more safely.',
  'Ruta ahorro: entra con Volcarona y usa Danza Aleteo x3.': 'Budget route: bring in Volcarona and use Quiver Dance x3.',
  'Si entra Infernape, usa Amortiguador para recibir A Bocajarro. Luego cambia a Gengar, usa Otra Vez y Maquinación hasta +4.': 'If Infernape comes in, use Soft-Boiled to take Close Combat. Then switch to Gengar, use Encore, and use Nasty Plot to +4.',
  'Si entra Hitmonchan, entra con Gengar y usa Maquinación hasta +4. No es necesario usar Otra Vez.': 'If Hitmonchan comes in, bring in Gengar and use Nasty Plot to +4. Encore is not needed.',
  'Cambia a Gengar, usa Otra Vez y luego cambia a Slowbro para revisar la ruta.': 'Switch to Gengar, use Encore, and then switch to Slowbro to check the route.',
  'Si Electivire se queda, usa Bostezo. Si se vuelve a quedar, sacrifica a Politoed para recibir Voltio Cruel. Luego cambia a Chansey y coloca Trampa Rocas.': 'If Electivire stays in, use Yawn. If it stays in again, sacrifice Politoed to take Wild Charge. Then switch to Chansey and set up Stealth Rock.',
  'Si entra Staraptor, vuelve a Gengar, usa Otra Vez, Maquinación hasta +2 y Precisión X.': 'If Staraptor comes in, go back to Gengar, use Encore, use Nasty Plot to +2, and use X Accuracy.',
  'Si entra Machamp, usa Gengar con Otra Vez. Luego cambia a Chansey. Cuando salga Staraptor, vuelve a Gengar, usa Otra Vez, Maquinación hasta +2 y Precisión X.': 'If Machamp comes in, use Gengar with Encore. Then switch to Chansey. When Staraptor comes in, go back to Gengar, use Encore, use Nasty Plot to +2, and use X Accuracy.',
  'Si entra Heracross, usa Protección y luego Bostezo.': 'If Heracross comes in, use Protect and then Yawn.',
  'Cuando salga Salamence, sacrifica a Politoed y entra con Poliwrath para usar Tambor hasta +6 Ataque.': 'When Salamence comes in, sacrifice Politoed and bring in Poliwrath to use Belly Drum and reach +6 Attack.',
  'Si entra Blastoise, cambia a Chansey y usa Amortiguador.': 'If Blastoise comes in, switch to Chansey and use Soft-Boiled.',
  'Cuando salga Hitmonlee, cambia a Gengar. Luego saca a Slowbro, usa Teletransporte y entra con Volcarona para usar Danza Aleteo x1.': 'When Hitmonlee comes in, switch to Gengar. Then send out Slowbro, use Teleport, and bring in Volcarona to use Quiver Dance x1.',
  'Si entra Steelix, cambia a Chansey y usa Amortiguador.': 'If Steelix comes in, switch to Chansey and use Soft-Boiled.',
  'Cuando salga Machamp, entra con Gengar, usa Otra Vez, Maquinación hasta +2 y Precisión X.': 'When Machamp comes in, bring in Gengar, use Encore, use Nasty Plot to +2, and use X Accuracy.',
  'Si entra Metagross, sigue la ruta de Metagross.': 'If Metagross comes in, follow the Metagross route.',
  'Usa Bostezo. Si usa Hierba Lazo, cambia a Chansey y usa Amortiguador. Cuando salga Hitmonlee, cambia a Gengar y luego a Slowbro para usar Bostezo.': 'Use Yawn. If it uses Grass Knot, switch to Chansey and use Soft-Boiled. When Hitmonlee comes in, switch to Gengar and then to Slowbro to use Yawn.',
  'Si entra Heracross, usa Protección y luego Bostezo. Cuando salga Salamence, sacrifica a Politoed y entra con Poliwrath para usar Tambor hasta +6 Ataque.': 'If Heracross comes in, use Protect and then Yawn. When Salamence comes in, sacrifice Politoed and bring in Poliwrath to use Belly Drum and reach +6 Attack.',
  'Si entra Rhyperior, usa Bostezo.': 'If Rhyperior comes in, use Yawn.',
  'Cuando salga Heracross, usa Protección y luego Bostezo. Cuando salga Salamence, sacrifica a Politoed y entra con Poliwrath para usar Tambor hasta +6 Ataque.': 'When Heracross comes in, use Protect and then Yawn. When Salamence comes in, sacrifice Politoed and bring in Poliwrath to use Belly Drum and reach +6 Attack.',
  'Ruta rápida: coloca Trampa Rocas, recibe Acróbata y cambia a Slowbro para usar Bostezo.': 'Fast route: set up Stealth Rock, take Acrobatics, and switch to Slowbro to use Yawn.',
  'Ruta ahorro: usa Amortiguador, recibe Acróbata y vuelve a usar Amortiguador.': 'Budget route: use Soft-Boiled, take Acrobatics, and use Soft-Boiled again.',
  'Cuando salga Hitmonlee, cambia a Gengar, usa Otra Vez y luego cambia a Slowbro.': 'When Hitmonlee comes in, switch to Gengar, use Encore, and then switch to Slowbro.',
  'Si Hitmonlee se queda, usa Bostezo.': 'If Hitmonlee stays in, use Yawn.',
  'Usa Amortiguador para recibir A Bocajarro.': 'Use Soft-Boiled to take Close Combat.',
  'Luego cambia a Gengar, usa Otra Vez y Maquinación hasta +4.': 'Then switch to Gengar, use Encore, and use Nasty Plot to +4.',
  'Usa Otra Vez nuevamente cuando sea necesario, porque Heracross tiene Banda Focus.': 'Use Encore again when needed because Heracross has Focus Sash.',
  'Entra con Gengar y usa Maquinación hasta +4.': 'Bring in Gengar and use Nasty Plot to +4.',
  'No es necesario usar Otra Vez.': 'Encore is not needed.',
  'Cambia a Gengar y luego a Slowbro.': 'Switch to Gengar and then to Slowbro.',
  'Coloca Trampa Rocas y cambia a Volcarona.': 'Set up Stealth Rock and switch to Volcarona.',
  'Usa Danza Aleteo x1 y barre.': 'Use Quiver Dance x1 and sweep.',
  'Luego usa Teletransporte hacia Gengar, usa Otra Vez y Maquinación hasta +4.': 'Then use Teleport into Gengar, use Encore, and use Nasty Plot to +4.',
  'Coloca Trampa Rocas. Cuando salga Metagross, cambia a Slowbro y usa Bostezo.': 'Set up Stealth Rock. When Metagross comes in, switch to Slowbro and use Yawn.',
  'Cuando salga Salamence, usa Teletransporte hacia Volcarona.': 'When Salamence comes in, use Teleport into Volcarona.',
  'Con Volcarona, usa Danza Aleteo x1 y continúa la ruta.': 'With Volcarona, use Quiver Dance x1 and continue the route.'
}

export const translateExactStrategyText = (text: string, language: Language) => {
  if (language === 'es') return text

  return exactTranslations[text] || text
}
