import { randomUUID } from "node:crypto"

export class DatabaseMemory {
  #videos = new Map()  // Map é uma estrutura de dado semelhante ao Objeto, tem dois parâmetros ( key, value)
  // #videos => chave privado ( só visto dentro dessa classe)

  list(search) { //  transforma os dados em array e retorna o id e as informações do video no mesmo objeto
    return Array.from(this.#videos.entries())
       .map((videoArray) => { // map percorre o array
         const id = videoArray [0]
         const data = videoArray [1]
  
         return {
           id,
           ...data
         }
      })
        .filter(video => {
          if(search) {
            return video.title.includes(search)
          }else {
            return true
          }
        })
  }

  create(video) {
    const videoId = randomUUID() // vai gerar um id único 

    this.#videos.set(videoId, video) // adicionar o video com o id gerado na estrutura de MAP
  }

  update(id, video) {
    this.#videos.set(id, video)
  }

  delete(id) {
    this.#videos.delete(id) 
  }

}