/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package arbolbinario;

import javax.swing.JOptionPane;
import javax.swing.JPanel;

/**
 *
 * @author duvanbotello
 * @param <T>
 */
public class TADArbol<T> {

    private NodoArbol<T> raiz;
    private int cant = 0;
    private int canth = 0;

    public TADArbol() {
        raiz = null;
    }

    public boolean ArbolVacio() {
        return raiz == null;
    }

    public boolean agregarRecursivo(T dato) {
        NodoArbol nuevo = new NodoArbol(dato);
        InsertarR(nuevo, raiz);
        return true;
    }

    public void InsertarR(NodoArbol nuevo, NodoArbol rz) {

        if (ArbolVacio()) {
            raiz = nuevo;
        } else {
            int compara = ((Comparable) rz.getDato()).compareTo(nuevo.getDato());
            System.out.println(compara);
            if (compara > 0) // datodelarbol es menor que dato
            {
                if (rz.getIzq() == null) {
                    rz.setIzq(nuevo);
                } else {
                    InsertarR(nuevo, rz.getIzq());
                }
            } else if (compara < 0) // datodelarbol es mayor que dato
            {
                if (rz.getDer() == null) {
                    rz.setDer(nuevo);
                } else {
                    InsertarR(nuevo, rz.getDer());
                }
            } else// datodelarbol es igual que dato
            {
                System.err.println("Error dato duplicado:" + nuevo.getDato().toString());

            }
        }
    }
    //cantidad de nodos que contiene el arbol

    public String cantidadNodos(NodoArbol reco) {
        if (reco != null) {
            cant++;
            cantidadNodos(reco.getIzq());
            cantidadNodos(reco.getDer());

        }
        return "" + cant;
    }

    //cantidad de hojas que contiene el arbol
    public String cantidadHOjas(NodoArbol raiz) {
        if (raiz != null) {
            if (raiz.getDer() == null && raiz.getIzq() == null) {
                canth++;
            }
            cantidadHOjas(raiz.getIzq());
            cantidadHOjas(raiz.getDer());

        }
        return "" + canth;
    }

    //Metodo para podar hojas
    private boolean saberHOja(NodoArbol h) {
        return h != null && h.getIzq() == null && h.getDer() == null;
    }

    public void PodarHOjas(NodoArbol nd) {
        if (nd != null) {

            if (saberHOja(nd.getIzq())) {
                nd.setIzq(null);
            }
            if (saberHOja(nd.getDer())) {
                nd.setDer(null);
            }
            PodarHOjas(nd.getIzq());
            PodarHOjas(nd.getDer());
        }

    }

    //Metodos para saber hijos de nodo.
    public void saberHIjos(NodoArbol raiz, int dato) {
        if (raiz == null) {
            JOptionPane.showMessageDialog(null, "Puede que el arbol este vacio \n o el nodo no existe");
        } else {
            int compare = ((Comparable) raiz.getDato()).compareTo(dato);
            if (compare > 0) {
                saberHIjos(raiz.getIzq(), dato);
            } else if (compare < 0) {
                saberHIjos(raiz.getDer(), dato);
            } else {
                if (raiz.getDer() == null && raiz.getIzq() == null) {
                    JOptionPane.showMessageDialog(null, "El Nodo no tiene hijos");
                } else if (raiz.getDer() == null) {
                    JOptionPane.showMessageDialog(null, "Los hijos de " + raiz.getDato() + "\n Hijo izquierdo: " + raiz.getIzq().getDato()
                            + "\n Hijo derecho: null");
                } else if (raiz.getIzq() == null) {
                    JOptionPane.showMessageDialog(null, "Los hijos de " + raiz.getDato() + "\n Hijo izquierdo: null" + "\n Hijo derecho: " + raiz.getDer().getDato());
                } else {
                    JOptionPane.showMessageDialog(null, "Los hijos de " + raiz.getDato() + "\n Hijo izquierdo: " + raiz.getIzq().getDato()
                            + "\n Hijo derecho: " + raiz.getDer().getDato());
                }
            }

        }
    }

    //Metodos para saber el padre de algun hijo
    public String saberPadre(NodoArbol rz, int dato, NodoArbol p) {
        //como recorro de izquierda a derecha el nodo padre siempre es el nodo anterior
        if (raiz == null) {
            System.out.println("entre");
            return "Arbol vacio o Nodo no encontrado";
        } else {
            int comparar = ((Comparable) rz.getDato()).compareTo(dato);
            if (comparar > 0) {

                return saberPadre(rz.getIzq(), dato, rz);
            } else if (comparar < 0) {

                return saberPadre(rz.getDer(), dato, rz);
            } else {
                //si rz es igual a la raiz entonces es la raiz
                if (rz.getDato() == raiz.getDato()) {
                    return "El Nodo raiz no contiene padre";
                } else {
                    return "" + p.getDato();
                }
            }
        }
    }

    //Metodo para saber si existe
    public boolean buscar(NodoArbol raiz, int dato) {
        if (raiz == null) {
            return (false);
        }
        int compara = ((Comparable) raiz.getDato()).compareTo(dato);
        if (compara > 0) {
            return buscar(raiz.getIzq(), dato);
        } else if (compara < 0) {
            return (buscar(raiz.getDer(), dato));
        } else {
            return (true);
        }

    }

    public void borrar(int dato) {
        if (raiz == null) {
            return;
        }
        int compara = ((Comparable) raiz.getDato()).compareTo(dato);

        if (compara == 0) {
            if (raiz.getIzq() == null) {
                raiz = raiz.getDer();
            } else {
                if (raiz.getDer() == null) {
                    raiz = raiz.getIzq();
                } else {
                    TADArbol hDer = subDer();
                    raiz = raiz.getIzq();
                    NodoArbol mayor = new Ope_adiconales().mayorValor1(raiz);
                    System.out.println("" + mayor.getDato());
                    mayor.setDer(hDer.getRaiz());
                }
            }
        } else {
            if (compara > 0) { // datodelarbol es mayor que dato
                System.out.println("entree");
                TADArbol hIzq = subIzq();
                hIzq.borrar(dato);
                raiz.setIzq(hIzq.getRaiz());
            } else {
                TADArbol hDer = subDer();
                hDer.borrar(dato);
                raiz.setDer(hDer.getRaiz());
            }
        }
    }

    private TADArbol subDer() {
        TADArbol der = new TADArbol();
        der.setRaiz(raiz.getDer());

        return der;
    }

    private TADArbol subIzq() {
        TADArbol izq = new TADArbol();
        izq.setRaiz(raiz.getIzq());
        return izq;
    }

    public void borrarMayor() {
        NodoArbol reco = raiz.getIzq();
        if (raiz != null) {
            if (raiz.getDer() == null) {
                raiz = raiz.getIzq();
            } else {
                NodoArbol anterior = raiz;
                reco = raiz.getDer();
                while (reco.getDer() != null) {
                    anterior = reco;
                    reco = reco.getDer();
                }

                anterior.setDer(reco.getIzq());
            }
        }
    }

    public void borrarMenor() {
        NodoArbol reco = raiz.getIzq();
        if (raiz != null) {
            if (raiz.getIzq() == null) {
                raiz = raiz.getDer();
            } else if (raiz!=null && raiz.getDer() == null && raiz.getIzq() == null) {
                raiz=null;
            } else {
                NodoArbol anterior = raiz;
                reco = raiz.getIzq();
                while (reco.getIzq() != null) {
                    anterior = reco;
                    reco = reco.getIzq();
                }

            }
        }

    }

    //dibujar arbol
    public JPanel getdibujo(TADArbol A) {
        return new GraficarArbol(A);
    }

    public NodoArbol<T> getRaiz() {
        return raiz;
    }

    public void setRaiz(NodoArbol<T> raiz) {
        this.raiz = raiz;
    }

    public int getCant() {
        return cant;
    }

    public void setCant(int cant) {
        this.cant = cant;
    }

    public int getCanth() {
        return canth;
    }

    public void setCanth(int canth) {
        this.canth = canth;
    }

}
