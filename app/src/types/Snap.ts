export default interface Snap {
    id?: string /* Document id from FireStore */;
    to: String[] /* Recipient UIDs */;
    from: string /* Sender UID */;
    body: string /* Main Message */;
    timestamp: Date /* Date/time of Submission*/;
}
