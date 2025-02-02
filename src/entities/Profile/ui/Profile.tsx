import ProfileHeader from "./ProfileHeader/ProfileHeader";
import { Input } from "@/shared/ui/Input";
import { Country, Currency, IProfile } from "../models/types";
import { InputSelect } from "@/shared/ui/InputSelect";
import styles from "./Profile.module.scss";
import { ChangeEvent } from "react";
import { Title } from "@/shared/ui/Title";
import { Skeleton } from "@/shared/ui/Skeleton";

interface IProps {
  profileData: IProfile | null;
  profileDisabled: boolean;
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeInputSelect: (event: ChangeEvent<HTMLSelectElement>) => void;

  isLoading?: boolean;
  error?: string;
}

function Profile(props: IProps) {
  const {
    profileData,
    profileDisabled,
    onChangeInput,
    onChangeInputSelect,
    isLoading,
    error,
  } = props;

  if (isLoading) {
    return (
      <>
        <div className={styles.loadingHeader}>
          <Skeleton width={160} height={40} />
          <Skeleton width={90} />
        </div>
        <div className={styles.profile}>
          <Skeleton
            width={100}
            height={100}
            circle
            addClass={styles.avatarSpanLoading}
          />
          {Array(8)
            .fill("")
            .map((_, i) => (
              <Skeleton key={i} />
            ))}
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className={styles.profile}>
        <Title text={error} danger />
      </div>
    );
  }

  return (
    <>
      <ProfileHeader
        profileDisabled={profileDisabled}
        profileData={profileData}
      />
      {profileData && (
        <div className={styles.profile}>
          <span className={styles.avatarSpan}>
            <img src={profileData?.avatar} alt={profileData?.username} />
          </span>
          <Input
            name="firstName"
            value={profileData.firstName}
            onChange={onChangeInput}
            readOnly={profileDisabled}
          />
          <Input
            name="lastName"
            value={profileData.lastName}
            onChange={onChangeInput}
            readOnly={profileDisabled}
          />
          <Input
            name="username"
            value={profileData.username}
            onChange={onChangeInput}
            readOnly={profileDisabled}
          />
          <Input
            name="city"
            value={profileData.city}
            onChange={onChangeInput}
            readOnly={profileDisabled}
          />
          <Input
            name="avatar"
            value={profileData.avatar}
            onChange={onChangeInput}
            readOnly={profileDisabled}
          />
          <Input
            name="age"
            value={profileData.age}
            onChange={onChangeInput}
            type="number"
            readOnly={profileDisabled}
          />
          <InputSelect
            name="currency"
            onChange={onChangeInputSelect}
            value={profileData.currency}
            options={[
              { value: Currency.EUR, content: Currency.EUR },
              { value: Currency.RUB, content: Currency.RUB },
              { value: Currency.SUM, content: Currency.SUM },
              { value: Currency.TG, content: Currency.TG },
            ]}
            disabled={profileDisabled}
          />
          <InputSelect
            name="country"
            onChange={onChangeInputSelect}
            value={profileData.country}
            options={[
              { value: Country.Armenia, content: Country.Armenia },
              { value: Country.Kazakhstan, content: Country.Kazakhstan },
              { value: Country.Russia, content: Country.Russia },
              { value: Country.Uzbekistan, content: Country.Uzbekistan },
            ]}
            disabled={profileDisabled}
          />
        </div>
      )}
    </>
  );
}

export default Profile;
