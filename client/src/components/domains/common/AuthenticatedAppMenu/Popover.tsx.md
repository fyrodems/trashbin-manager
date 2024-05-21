<Popover
placement="bottomRight"
trigger={['click']}
content={

<div className={styles.profileMenu}>
<div className={styles.account}>
<Avatar size="default" shape="square">
{user?.users_name.charAt(0)}
</Avatar>
<div className={styles.name}>
<div>{user?.users_name}</div>
</div>
</div>
<div className={styles.actions}>
<Button onClick={logout} block>
Log out
</Button>
</div>
</div>
}

>   <Button type="text" size="large" shape="circle">

    <div className={styles.avatar}>
      <Avatar size="small" shape="circle">
        {user?.users_name.charAt(0)}
        </Avatar>
    </div>

  </Button>
</Popover>
