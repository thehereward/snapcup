/* Snap Structure */
export default interface Snap {
    to: string[] /* Recipient UIDs */;
    from: string /* Sender UID */;
    body: string /* Main Message */;
    timestamp: Date /* Date/time of Submission*/;
}
