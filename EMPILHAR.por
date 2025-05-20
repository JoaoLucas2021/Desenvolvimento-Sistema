programa
{
	
	const inteiro TAMANHO_MAXIMO = 20
	inteiro pilha[TAMANHO_MAXIMO]
	inteiro topo = -1

	funcao logico pilhaCheia()
	{
		retorne topo == TAMANHO_MAXIMO - 1
	}

	funcao logico pilhaVazia(){

		retorne topo == -1
}
      funcao empilhar(inteiro valor){

      	se (pilhaCheia()){
      		escreva("Erro: pilha cheia")}

      		senao{
      			topo = topo + 1
      			pilha[topo] = valor
      		}
      	}
      	funcao inteiro desempilhar(){
      		se (pilhaVazia()){
      			escreva("Erro: pilha vazia")

      			retorne -1}

      			senao{
      				inteiro valor = pilha[topo]
      				topo = topo - 1
      				retorne valor
      		}
      	}


      	funcao exibirPilhaRecursiva(inteiro indice){
      		se (indice < 0){
      			retorne
      			
      		}

      		escreva("Elemento: ", pilha[indice], "\n")
      		exibirPilhaRecursiva(indice - 1)
      	}
      	funcao inicio(){

      		empilhar(2)
      		empilhar(4)
      		empilhar(6)
               empilhar(8)
               empilhar(10)
               empilhar(12)
               empilhar(14)
               empilhar(16)
               empilhar(18)
               empilhar(20)
      		escreva("Conteúdo da pilha:\n")
      		exibirPilhaRecursiva(topo)

      		inteiro removido = desempilhar()
      		escreva("Elemento removido: ", removido, "\n")

      		escreva("Pilha após remoção:\n")
      		exibirPilhaRecursiva(topo)
      	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 654; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */