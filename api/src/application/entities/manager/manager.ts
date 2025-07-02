export interface ManagerProps {
    name: string;
    email: string;
    password: string;
    isSuper: boolean;
    isActive: boolean;
}
export class Manager{
    private readonly _id:string;
    private props: ManagerProps;
    constructor(props: ManagerProps, id?: string) {
        if (!props.name.trim()) throw new Error("Name cannot be empty");
        if (!props.email.trim()) throw new Error("Email cannot be empty");
        if (!props.password.trim()) throw new Error("Password cannot be empty");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(props.email)) throw new Error("Email format is invalid");
        
        this._id = id ?? crypto.randomUUID();
        this.props = props;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    /**
     * Sets the name of the manager.
     * Throws an error if the name is empty or only contains whitespace.
     * @param name - The new name for the manager.
     */
    set name(name: string) {
        this.props.name = name;
    }

    get email(): string {
        return this.props.email;
    }

    /**
     * Sets the email of the manager.
     * Throws an error if the email is empty or not a valid email format.
     * @param email - The new email for the manager.
     */
    set email(email: string) {
        this.props.email = email;
    }

    get password(): string {
        return this.props.password;
    }

    /**
     * Sets the password of the manager.
     * Throws an error if the password is empty or does not meet security requirements.
     * @param password - The new password for the manager.
     */
    set password(password: string) {
        this.props.password = password;
    }

    get isSuper(): boolean {
        return this.props.isSuper;
    }

    /**
     * Sets whether the manager has super privileges.
     * @param isSuper - True if the manager has super privileges, false otherwise.
     */
    set isSuper(isSuper: boolean) {
        this.props.isSuper = isSuper;
    }

    get isActive(): boolean {
        return this.props.isActive;
    }

    /**
     * Sets whether the manager is active.
     * @param isActive - True if the manager is active, false otherwise.
     */
    set isActive(isActive: boolean) {
        this.props.isActive = isActive;
    }
}