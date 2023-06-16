package com.example.myapplication.adapters;

import android.content.Context;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.example.myapplication.R;
import com.example.myapplication.listeners.OnItemClickListener;
import com.example.myapplication.models.Contact;
import com.example.myapplication.viewModels.UserVM;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class ContactListAdapter extends RecyclerView.Adapter<ContactListAdapter.ViewHolder> {

    private LayoutInflater inflater;
    private List<Contact> contacts;
    private OnItemClickListener listener;
    private UserVM userViewModel;

    public static class ViewHolder extends RecyclerView.ViewHolder {
        private final ImageView imageView;
        private final TextView displayName;
        private final TextView lastMsg;
        private final TextView time;

        public ViewHolder(View view) {
            super(view);
            imageView = view.findViewById(R.id.ContactProfilePic);
            displayName = view.findViewById(R.id.ContactDisplayName);
            lastMsg = view.findViewById(R.id.ContactLastMessage);
            time = view.findViewById(R.id.ContactHour);
        }
    }

    public ContactListAdapter(Context context, OnItemClickListener listener) {
        this.inflater = LayoutInflater.from(context);
        this.listener = listener;
        this.userViewModel = new UserVM();
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View view = this.inflater.inflate(R.layout.contact, viewGroup, false); //inflate contact layout and catch it
        return new ViewHolder(view);
    }

    public void onBindViewHolder(ViewHolder viewHolder, final int position) {
        if (this.contacts != null) {
            setPictureContact(viewHolder, position);
            viewHolder.displayName.setText(contacts.get(position).getUser().getDisplayName());
            if (contacts.get(position).getLastMessage() != null) {
                viewHolder.lastMsg.setText(contacts.get(position).getLastMessage().getContent()); //set last message

                Date dateLstMsg = contacts.get(position).getLastMessage().getCreated(); //set last massages time
                SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
                viewHolder.time.setText(sdf.format(dateLstMsg));
            }
            viewHolder.itemView.setOnClickListener(view -> { //when clicking on one of the contacts it will get it and performs the lambda = open the chat with this contact
                listener.onItemClick(contacts.get(position));
            });
        }
    }

    private void setPictureContact(ViewHolder viewHolder, final int position) { //if the user and its profilePic is not null set the pic in the viewHolder-imageView
        if (userViewModel.getUser(contacts.get(position).getUser().getUsername()) != null &&
                contacts.get(position).getUser().getProfilePic() != null) {
            viewHolder.imageView.setImageURI(Uri.parse(contacts.get(position).getUser().getProfilePic()));
        }
    }

    @Override
    public int getItemCount() {
        if (this.contacts == null)
            return 0;
        return this.contacts.size();
    }

    public void setContactsList(List<Contact> newContacts) {
        this.contacts = newContacts;
        notifyDataSetChanged();
    }


}