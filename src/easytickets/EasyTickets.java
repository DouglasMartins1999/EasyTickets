package easytickets;

/**
 *
 * @author Douglas
 */
import Partidas.Partida;

public class EasyTickets {
    public static void main(String[] args) {
        Partida p = new Partida("Corinthians", "Palmeiras", 3, 2, "Brasileiro", "Itaquera", 3545, 4.5);
        System.out.println(p.toString());
    }
}
