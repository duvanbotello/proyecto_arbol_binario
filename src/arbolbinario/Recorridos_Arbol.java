/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package arbolbinario;

import java.util.LinkedList;

/**
 *
 * @author duvanbotello
 */


public class Recorridos_Arbol {

    /**
     *
     * @param rz
     * @param x
     * @TIPO METODOS RECURSIVOS
     */
    
    
    //de izquierda a derecha
    public void Pre_Orden(NodoArbol rz, LinkedList x) {
        if (rz != null) {
            x.add(rz.getDato());
            Pre_Orden(rz.getIzq(), x);
            Pre_Orden(rz.getDer(), x);
        }
    }

    //izquierda, raiz, derecha
    public void In_orden(NodoArbol rz, LinkedList x) {
        if (rz != null) {
            In_orden(rz.getIzq(), x);
            x.add(rz.getDato());
            In_orden(rz.getDer(), x);
        }
    }

    //izquierda, derecha, raiz
    public void Post_orden(NodoArbol rz, LinkedList x) {
        if (rz != null) {
            Post_orden(rz.getIzq(), x);
            Post_orden(rz.getDer(), x);
            x.add(rz.getDato());
        }
    }

}
