export const galleries = {
  '06': [['Player atual', 'k4bot/player-atual.png'], ['Player em uso no Discord', 'k4bot/discord-player.png']],
  '01': [['Visão geral','streamhub/streamhub-hero.webp'], ...['Múltiplas saídas','Informações da transmissão','Chat integrado','Configuração dos chats','Overlay do chat','Mensagens do overlay','Adicionar destino','Moderação','Filtro de mensagens','Filtro de áudio'].map((label,i)=>[label,'streamhub/streamhub-'+String(i+1).padStart(2,'0')+'.png'])],
  '02': [['K4 PLAY','k4-play/k4-play-cover.webp'],['Página inicial','k4-play/inicio.jpg']],
  '03': [['Operação do bot','promo-bot/operacao.jpg'],['Arquitetura do bot','promo-bot/arquitetura.jpg']],
  '04': [['Pokédex','pokedex/pokedex-cover.webp'],['Explorar Pokémon','pokedex/explorar.jpg']],
  '05': [['Jogos','jogos'],['Emuladores','emuladores'],['Pastas','pastas'],['Sites','sites'],['Aplicativos','apps'],['Biblioteca Steam','steam'],['BLACK PT-BR','black'],['Projetos','projetos']].map(([label,file])=>[label,'roda-de-ultilidade/'+file+'-gt.jpg'])
};
