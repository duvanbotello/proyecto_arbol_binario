/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package arbolbinario;

import java.util.Scanner;

/**
 *
 * @author duvanbotello
 */
public class prueba {
    public static void main(String arg[]){
        TADArbol<Integer> arbol = new TADArbol<>();
        Scanner leer = new Scanner(System.in);
        int salir = 1;
        while(salir == 1){
            System.out.println("Ingre dato al arbol");
            int dato = leer.nextInt();
            if(arbol.agregarRecursivo(dato)){
                System.out.println("dato agregado con extio");
            }else{
                System.out.println("error al agregar dato");
            }
        }
    }
}
